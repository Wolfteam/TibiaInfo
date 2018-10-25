import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { WorldService } from 'src/app/services/world.service';
import { SimpleWorld } from 'src/app/models/worlds/simple-world.model';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-world-list',
  templateUrl: './world-list.component.html',
  styleUrls: ['./world-list.component.css']
})
export class WorldListComponent implements OnInit {

  private isPageLoaded: boolean;
  private worlds: SimpleWorld[] = [];
  private filteredWorlds: SimpleWorld[] = [];
  private filteredWorldOptions: string[] = [];


  constructor(
    private appService: AppService,
    private worldService: WorldService
  ) { }

  ngOnInit() {
    this.appService.changeMaintTitle('Worlds');
    this.appService.showMainProgressBar(true);
    this.appService.showBackButton(false);

    this.worldService.getAllWorlds().subscribe(r => {
      if (r.succeed) {
        this.worlds = r.result.worlds;
        this.filteredWorlds = r.result.worlds;
        this.filteredWorldOptions = this.getWorldSearchOptions('');
        this.isPageLoaded = true;
      } else {
        this.appService.showMessage('An error occurred while trying to get the character. ' + r.message);
      }
    }, (error) => this.appService.showMessage('An unknown error occurred while trying to get all the worlds. ' + error),
      () => this.appService.showMainProgressBar(false));
  }

  private getWorldSearchOptions(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.worlds
      .filter(world => world.name.toLowerCase().includes(filterValue))
      .map(world => world.name);
  }

  private onWorldSearchTextChange(search: string) {
    this.filteredWorlds = this.worlds.filter(w => w.name.toLowerCase().includes(search.toLowerCase()));
    this.filteredWorldOptions = this.getWorldSearchOptions(search)
  }

  private onWorldSelected(event: MatAutocompleteSelectedEvent) {
    console.log(event.option);
  }

  private orderBySelectionChanged(id: number) {
    if (id === 1)
      this.filteredWorlds = this.filteredWorlds.sort((n1, n2) => n1.name > n2.name ? 1 : n1.name < n2.name ? -1 : 0);
    else
      this.filteredWorlds = this.filteredWorlds.sort((a, b) => b.numberOfPlayersOnline - a.numberOfPlayersOnline);
  }
}
