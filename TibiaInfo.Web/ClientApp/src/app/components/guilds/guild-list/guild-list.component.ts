import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { Subscription } from 'rxjs';
import { AllGuilds } from 'src/app/models/guilds/all-guilds.model';
import { GuildService } from 'src/app/services/guild.service';
import { SortDirectionType } from 'src/app/enums/sort-direction-type.enum';
import { BaseGuild } from 'src/app/models/guilds/base-guild.model';

@Component({
  selector: 'app-guild-list',
  templateUrl: './guild-list.component.html',
  styleUrls: ['./guild-list.component.css']
})
export class GuildListComponent implements OnInit {

  private isPageLoaded: boolean = false;
  private showAdditionalFilters: boolean = false;
  private subscriptions: Subscription[] = [];
  private guilds: AllGuilds;
  private filteredActiveGuilds: BaseGuild[] = [];
  private filteredFormationGuilds: BaseGuild[] = [];
  private filteredGuildsOptions: string[] = [];
  private isWorldSearchControlEnabled: boolean = true;

  constructor(
    private appService: AppService,
    private guildService: GuildService
  ) { }

  ngOnInit(): void {
    this.appService.changeMaintTitle('Guilds');
    this.appService.showBackButton(false);
  }

  private getAllGuilds(world: string): void {
    this.showAdditionalFilters = false;
    this.isWorldSearchControlEnabled = false;
    this.appService.showMainProgressBar(true);

    this.subscriptions.push(
      this.guildService.getAllGuilds(world).subscribe(r => {
        if (r.succeed) {
          this.guilds = r.result;
          this.sortGuilds(['', SortDirectionType.ASCENDING]);
          this.showAdditionalFilters = true;
          this.isPageLoaded = true;
        } else {
          this.appService.showMessage(`An error occurred while trying to get all the guilds for world : ${world}. ${r.message}`)
        }
        this.isWorldSearchControlEnabled = true;
      }, (error) => {
        this.isWorldSearchControlEnabled = true;
        console.log(error);
        this.appService.showMessage('An unkwnown error occurred while trying to get all the guilds');
        this.appService.showMainProgressBar(false);
      },
        () => this.appService.showMainProgressBar(false))
    );
  }

  private sortGuilds(tuple: [string, SortDirectionType]): void {
    const search: string = tuple[0].toLowerCase();
    const sortDirection: SortDirectionType = tuple[1];

    let filteredActiveGuilds = this.guilds.active.filter(g => g.name.toLowerCase().includes(search))
    let filteredFormationGuilds = this.guilds.formation.filter(g => g.name.toLowerCase().includes(search))
    if (sortDirection === SortDirectionType.ASCENDING) {
      this.filteredActiveGuilds = filteredActiveGuilds.sort((n1, n2) => n1.name > n2.name ? 1 : n1.name < n2.name ? -1 : 0);
      this.filteredFormationGuilds = filteredFormationGuilds.sort((n1, n2) => n1.name > n2.name ? 1 : n1.name < n2.name ? -1 : 0);
    } else {
      this.filteredActiveGuilds = filteredActiveGuilds.sort((n1, n2) => n1.name > n2.name ? -1 : n1.name < n2.name ? 1 : 0);
      this.filteredFormationGuilds = filteredFormationGuilds.sort((n1, n2) => n1.name > n2.name ? -1 : n1.name < n2.name ? 1 : 0);
    }

    this.filteredGuildsOptions = this.filteredActiveGuilds
      .map(g => g.name)
      .concat(this.filteredFormationGuilds.map(g => g.name))
      .sort();
  }
}
