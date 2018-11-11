import { Component, OnInit, OnDestroy } from '@angular/core';
import { GuildService } from 'src/app/services/guild.service';
import { AppService } from 'src/app/services/app.service';
import { Guild } from 'src/app/models/guilds/guild.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from 'src/app/services/character.service';
import { GuildMemberSortFilterType } from 'src/app/enums/guild-member-sort-filter-type.enum';
import { SortDirectionType } from 'src/app/enums/sort-direction-type.enum';
import { GuildRank } from 'src/app/models/guilds/guild-rank.model';
import { VocationHelper } from 'src/app/helpers/vocation.helpers';

@Component({
  selector: 'app-guild-details',
  templateUrl: './guild-details.component.html',
  styleUrls: ['./guild-details.component.css']
})
export class GuildDetailsComponent implements OnInit, OnDestroy {
  //TODO: I need to show if the guild is at war or not
  isPageLoaded: boolean = false;
  guild: Guild;

  filteredRanks: GuildRank[];

  filteredGuildMemberOptions: string[] = [];
  filteredGuildRankOptions: string[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private appService: AppService,
    private characterService: CharacterService,
    private guildService: GuildService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.appService.showMainProgressBar(true);
    this.appService.showBackButton(true);
    this.appService.setBackRouterPath('/guilds');

    this.subscriptions.push(
      this.activeRoute.paramMap.subscribe(params => {
        const guildName = params.get('name');
        if (guildName === null || guildName === '') {
          this.appService.showMainProgressBar(false);
          this.appService.showMessage('You need to provide a valid guild name.');
          return;
        }
        this.guildService.getGuild(guildName).subscribe(r => {
          if (r.succeed) {
            const cachedCharacters: string[] = this.characterService
              .getArrayCachedCharacterNames();
            cachedCharacters.forEach(p => p.toLowerCase());
            r.result.ranks.forEach(rank => {
              rank.rankMembers.forEach(p => {
                if (cachedCharacters.includes(p.name.toLowerCase()))
                  p.isInFavorites = true;
                else
                  p.isInFavorites = false;
              })
            });
            this.guild = r.result;
            this.sortGuildMembers(['', '', GuildMemberSortFilterType.RANK, SortDirectionType.ASCENDING, -1]);
            this.appService.changeMaintTitle(`Guild - ${r.result.name}`);
            this.isPageLoaded = true;
          } else {
            this.appService.showMessage(`An error occurred while trying to get the guild. ${r.message}`);
          }
        }, (error) => {
          console.log(error);
          this.appService.showMessage('An unknown error occurred.');
          this.appService.showMainProgressBar(false);
        },
          () => this.appService.showMainProgressBar(false))
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  sortGuildMembers(tuple: [string, string, GuildMemberSortFilterType, SortDirectionType, number]): void {
    const characterSearch: string = tuple[0].toLowerCase();
    const rankSearch: string = tuple[1].toLowerCase();
    const sortOrder: GuildMemberSortFilterType = tuple[2];
    const sortDirection: SortDirectionType = tuple[3];
    const vocation: number = tuple[4];

    let filtered: GuildRank[] = [];
    if (vocation === -1) {
      this.guild.ranks.forEach(r => {
        if (r.rankMembers.filter(p => p.name.toLowerCase().includes(characterSearch)).length > 0 &&
          r.rankTitle.toLowerCase().includes(rankSearch)) {
          filtered.push({ ...r });
        }
      });
      filtered.forEach(r =>
        r.rankMembers = r.rankMembers.filter(p => p.name.toLowerCase().includes(characterSearch))
      );
    } else {
      this.guild.ranks.forEach(r => {
        if (r.rankMembers.filter(p => p.name.toLowerCase().includes(characterSearch) && p.vocation === vocation).length > 0 &&
          r.rankTitle.toLowerCase().includes(rankSearch)) {
          filtered.push({ ...r });
        }
      });
      filtered.forEach(r =>
        r.rankMembers = r.rankMembers.filter(p => p.name.toLowerCase().includes(characterSearch) && p.vocation === vocation)
      );
    }
    let guildMemberOptions: string[] = [];
    const guildRankOptions: string[] = [];
    filtered.forEach(rank => {
      guildRankOptions.push(rank.rankTitle);
      guildMemberOptions = guildMemberOptions.concat(rank.rankMembers.map(m => m.name));
    });

    this.filteredGuildMemberOptions = guildMemberOptions.sort();
    this.filteredGuildRankOptions = guildRankOptions.sort();

    switch (sortOrder) {
      case GuildMemberSortFilterType.RANK:
        if (sortDirection === SortDirectionType.ASCENDING) {
          filtered = filtered.sort((n1, n2) => n1.rankTitle > n2.rankTitle ? 1 : n1.rankTitle < n2.rankTitle ? -1 : 0)
        } else {
          filtered = filtered.sort((n1, n2) => n1.rankTitle > n2.rankTitle ? -1 : n1.rankTitle < n2.rankTitle ? 1 : 0)
        }
        filtered.forEach(r => r.rankMembers = r.rankMembers.sort((n1, n2) => n1.name > n2.name ? 1 : n1.name < n2.name ? -1 : 0));
        break;
      case GuildMemberSortFilterType.JOINED_DATE:
        if (sortDirection === SortDirectionType.ASCENDING) {
          filtered.forEach(r => r.rankMembers = r.rankMembers.sort((n1, n2) => n1.joinedOn > n2.joinedOn ? 1 : n1.joinedOn < n2.joinedOn ? -1 : 0));
        }
        else {
          filtered.forEach(r => r.rankMembers = r.rankMembers.sort((n1, n2) => n1.joinedOn > n2.joinedOn ? -1 : n1.joinedOn < n2.joinedOn ? 1 : 0));
        }
        break;
      case GuildMemberSortFilterType.LEVEL:
        if (sortDirection === SortDirectionType.ASCENDING) {
          filtered.forEach(r => r.rankMembers = r.rankMembers.sort((n1, n2) => n1.level > n2.level ? 1 : n1.level < n2.level ? -1 : 0));
        }
        else {
          filtered.forEach(r => r.rankMembers = r.rankMembers.sort((n1, n2) => n1.level > n2.level ? -1 : n1.level < n2.level ? 1 : 0));
        }
        break;
      case GuildMemberSortFilterType.NAME:
        if (sortDirection === SortDirectionType.ASCENDING) {
          filtered.forEach(r => r.rankMembers = r.rankMembers.sort((n1, n2) => n1.name > n2.name ? 1 : n1.name < n2.name ? -1 : 0));
        }
        else {
          filtered.forEach(r => r.rankMembers = r.rankMembers.sort((n1, n2) => n1.name > n2.name ? -1 : n1.name < n2.name ? 1 : 0));
        }
        break;
      case GuildMemberSortFilterType.VOCATION:
        if (sortDirection === SortDirectionType.ASCENDING)
          filtered.forEach(r => r.rankMembers = r.rankMembers.sort((a, b) => {
            const vocationA: string = VocationHelper.toVocation(a.vocation);
            const vocationB: string = VocationHelper.toVocation(b.vocation);
            return vocationA > vocationB ? 1 :
              vocationA < vocationB ? -1 : 0;
          }));
        else
          filtered.forEach(r => r.rankMembers = r.rankMembers.sort((a, b) => {
            const vocationA: string = VocationHelper.toVocation(a.vocation);
            const vocationB: string = VocationHelper.toVocation(b.vocation);
            return vocationA > vocationB ? -1 :
              vocationA < vocationB ? 1 : 0;
          }));
      default:
        break;
    }
    this.filteredRanks = filtered;
  }
}
