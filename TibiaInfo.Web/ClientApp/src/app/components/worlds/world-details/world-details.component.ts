import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { WorldService } from 'src/app/services/world.service';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { World } from 'src/app/models/worlds/world.model';
import { StatusType } from 'src/app/enums/status-type.enum';
import { SimpleCharacter } from 'src/app/models/characters/simple-character.model';
import { Subscription } from 'rxjs';
import { SexType } from 'src/app/enums/sex-type.enum';
import { SortDirectionType } from 'src/app/enums/sort-direction-type.enum';
import { CharacterSortFilterType } from 'src/app/enums/characer-sort-filter-type.enum';
import { VocationHelper } from '../../../helpers/vocation.helpers';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { CharacterService } from 'src/app/services/character.service';

@Component({
  selector: 'app-world-details',
  templateUrl: './world-details.component.html',
  styleUrls: ['./world-details.component.css'],
})
export class WorldDetailsComponent implements OnInit, OnDestroy {

  @ViewChild('worldPlayersViewPort', { static: false }) worldPlayersViewPort: CdkVirtualScrollViewport;
  //TODO: Implement a way to add/ remove the char from the cookies, maybe you will find trouble with this
  //TODO: When going back to the world list component the filter should be as they were left
  //TODO: maybe use query params to filter
  isPageLoaded: boolean;
  world: World;
  private subscription: Subscription[] = [];
  filteredWorldPlayers: SimpleCharacter[] = [];
  filteredWorldPlayersOptions: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private characterService: CharacterService,
    private worldService: WorldService
  ) { }

  ngOnInit(): void {
    this.appService.showMainProgressBar(true);
    this.appService.showBackButton(true);
    this.appService.setBackRouterPath('/worlds');

    this.subscription.push(
      this.activatedRoute.paramMap.subscribe(params => {
        const worldName = params.get('name');
        if (worldName === null || worldName === '') {
          this.appService.showMainProgressBar(false);
          this.appService.showMessage('You need to provide a valid world name.');
          return;
        }

        this.worldService.getWorld(worldName).subscribe(r => {
          if (r.succeed) {
            const cachedCharacters: string[] = this.characterService
              .getArrayCachedCharacterNames();
            cachedCharacters.forEach(p => p.toLowerCase());

            r.result.playersOnline.forEach(p => {
              if (cachedCharacters.includes(p.name.toLowerCase()))
                p.isInFavorites = true;
              else
                p.isInFavorites = false;

              p.status = StatusType.ONLINE;
              p.world = r.result.name;
              p.sex = SexType.UNKNOWN;
            });
            this.world = r.result;
            this.filterWorldPlayers(['', CharacterSortFilterType.NAME, SortDirectionType.ASCENDING, -1]);
            this.isPageLoaded = true;
            this.appService.changeMaintTitle(`World - ${r.result.name}`);
          }
          else {
            this.appService.showMessage('An error occurred while trying to get the world. ' + r.message);
          }
        },
          (error) => {
            console.log(error);
            this.appService.showMessage('An unknown error occurred.');
            this.appService.showMainProgressBar(false);
          },
          () => this.appService.showMainProgressBar(false)
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

  onWorldPlayerSelected(name: string): void {
    this.worldPlayersViewPort.scrollTo({
      start: 0,
      top: 0
    });
  }

  filterWorldPlayers(tuple: [string, CharacterSortFilterType, SortDirectionType, number]): void {
    const search: string = tuple[0].toLowerCase();
    const sortOrder: CharacterSortFilterType = tuple[1];
    const sortDirection: SortDirectionType = tuple[2];
    const vocation: number = tuple[3];

    let playersFiltered: SimpleCharacter[];
    if (vocation !== -1)
      playersFiltered = this.world.playersOnline.filter(p => p.vocation === vocation);
    else
      playersFiltered = this.world.playersOnline;

    playersFiltered = playersFiltered.filter(p => p.name.toLowerCase().includes(search));

    switch (sortOrder) {
      case CharacterSortFilterType.LEVEL:
        if (sortDirection === SortDirectionType.ASCENDING)
          this.filteredWorldPlayers = playersFiltered.sort((a, b) => a.level - b.level);
        else
          this.filteredWorldPlayers = playersFiltered.sort((a, b) => b.level - a.level);
        break;
      case CharacterSortFilterType.NAME:
        if (sortDirection === SortDirectionType.ASCENDING)
          this.filteredWorldPlayers = playersFiltered.sort((n1, n2) => n1.name > n2.name ? 1 : n1.name < n2.name ? -1 : 0);
        else
          this.filteredWorldPlayers = playersFiltered.sort((n1, n2) => n1.name > n2.name ? -1 : n1.name < n2.name ? 1 : 0);
        break;
      case CharacterSortFilterType.VOCATION:
        if (sortDirection === SortDirectionType.ASCENDING)
          this.filteredWorldPlayers = playersFiltered.sort((a, b) => {
            const vocationA: string = VocationHelper.toVocation(a.vocation);
            const vocationB: string = VocationHelper.toVocation(b.vocation);
            return vocationA > vocationB ? 1 :
              vocationA < vocationB ? -1 :
                0;
          });
        else
          this.filteredWorldPlayers = playersFiltered.sort((a, b) => {
            const vocationA: string = VocationHelper.toVocation(a.vocation);
            const vocationB: string = VocationHelper.toVocation(b.vocation);
            return vocationA > vocationB ? -1 :
              vocationA < vocationB ? 1 :
                0;
          });
        break;
      default:
        break;
    }

    this.filteredWorldPlayersOptions = this.filteredWorldPlayers.map(p => p.name).sort();
  }
}
