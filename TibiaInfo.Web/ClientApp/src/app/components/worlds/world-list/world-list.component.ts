import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { WorldService } from 'src/app/services/world.service';
import { SimpleWorld } from 'src/app/models/worlds/simple-world.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { SortDirectionType } from 'src/app/enums/sort-direction-type.enum';
import { WorldListSortFilterType } from 'src/app/enums/world-list-sort-filter-type.enum';

@Component({
  selector: 'app-world-list',
  templateUrl: './world-list.component.html',
  styleUrls: ['./world-list.component.css']
})
export class WorldListComponent implements OnInit {

  isPageLoaded: boolean;
  private worlds: SimpleWorld[] = [];
  filteredWorlds: SimpleWorld[] = [];
  filteredWorldOptions: string[] = [];

  constructor(
    private appService: AppService,
    private worldService: WorldService
  ) { }

  ngOnInit(): void {
    this.appService.changeMaintTitle('Worlds');
    this.appService.showMainProgressBar(true);
    this.appService.showBackButton(false);

    this.worldService.getAllWorlds().subscribe(r => {
      if (r.succeed) {
        this.worlds = r.result.worlds;
        this.filterWorlds(['', WorldListSortFilterType.NAME, SortDirectionType.ASCENDING, -1]);
        this.isPageLoaded = true;
      } else {
        this.appService.showMessage('An error occurred while trying to get the all the worlds. ' + r.message);
      }
    }, (error) => {
      console.log(error);
      this.appService.showMainProgressBar(false);
      this.appService.showMessage('An unknown error occurred while trying to get all the worlds.')
    },
      () => this.appService.showMainProgressBar(false));
  }

  onWorldSelected(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option);
  }

  filterWorlds(tuple: [string, WorldListSortFilterType, SortDirectionType, number]): void {
    const search: string = tuple[0].toLowerCase();
    const sortOrder: WorldListSortFilterType = tuple[1];
    const sortDirection: SortDirectionType = tuple[2];
    const sortPvp: number = tuple[3];

    let filteredWorlds: SimpleWorld[];
    if (sortPvp === -1)
      filteredWorlds = this.worlds;
    else
      filteredWorlds = this.worlds.filter(w => w.pvpType === sortPvp);

    filteredWorlds = filteredWorlds.filter(world => world.name.toLowerCase().includes(search))

    switch (sortOrder) {
      case WorldListSortFilterType.NAME:
        if (sortDirection === SortDirectionType.ASCENDING)
          this.filteredWorlds = filteredWorlds.sort((n1, n2) => n1.name > n2.name ? 1 : n1.name < n2.name ? -1 : 0);
        else
          this.filteredWorlds = filteredWorlds.sort((n1, n2) => n1.name > n2.name ? -1 : n1.name < n2.name ? 1 : 0);
        break;
      case WorldListSortFilterType.PLAYERS_ONLINE:
        this.filteredWorlds = filteredWorlds.sort((a, b) =>
          sortDirection === SortDirectionType.ASCENDING ?
            a.numberOfPlayersOnline - b.numberOfPlayersOnline :
            b.numberOfPlayersOnline - a.numberOfPlayersOnline);
      default:
        break;
    }
    this.filteredWorldOptions = this.filteredWorlds.map(world => world.name).sort();
  }
}
