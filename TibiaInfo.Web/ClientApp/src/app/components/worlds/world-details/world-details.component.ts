import { Component, OnInit, OnDestroy } from '@angular/core';
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

@Component({
  selector: 'app-world-details',
  templateUrl: './world-details.component.html',
  styleUrls: ['./world-details.component.css'],
})
export class WorldDetailsComponent implements OnInit, OnDestroy {

  private isPageLoaded: boolean;
  private world: World;
  private subscription: Subscription[] = [];
  private filteredWorldPlayers: SimpleCharacter[] = [];
  private filteredWorldPlayersOptions: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private worldService: WorldService
  ) { }

  ngOnInit(): void {
    this.appService.showMainProgressBar(true);
    this.appService.showBackButton(true);
    this.appService.setBackRouterPath('/worlds');

    this.subscription.push(
      this.activatedRoute.paramMap.subscribe(params => {
        const worldName = params.get('name');
        if (worldName === null || worldName == '') {
          this.appService.showMainProgressBar(false);
          this.appService.showMessage('You need to provide a valid world name.');
          return;
        }

        this.worldService.getWorld(worldName).subscribe(r => {
          if (r.succeed) {
            r.result.playersOnline.forEach(p => {
              p.status = StatusType.ONLINE;
              p.world = r.result.name;
              p.sex = SexType.UNKNOWN;
            });
            this.world = r.result;
            this.filteredWorldPlayers = this.world.playersOnline;
            this.filteredWorldPlayersOptions = this.getWorldPlayersSearchOptions('');
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

  private onWorldPlayerTextChange(search: string) {
    this.filteredWorldPlayers = this.world.playersOnline
      .filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    this.filteredWorldPlayersOptions = this.getWorldPlayersSearchOptions(search)
  }

  private getWorldPlayersSearchOptions(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.world.playersOnline
      .filter(player => player.name.toLowerCase().includes(filterValue))
      .map(player => player.name);
  }

  private sortWorldPlayers(tuple: [CharacterSortFilterType, SortDirectionType]): void {
    //TODO: For some reason this only works when using the autocomplete
    switch (tuple[0]) {
      case CharacterSortFilterType.LEVEL:
        if (tuple[1] === SortDirectionType.ASCENDING)
          this.filteredWorldPlayers = this.filteredWorldPlayers.sort((a, b) => a.level - b.level);
        else
          this.filteredWorldPlayers = this.filteredWorldPlayers.sort((a, b) => b.level - a.level);
        break;
      case CharacterSortFilterType.NAME:
        if (tuple[1] === SortDirectionType.ASCENDING)
          this.filteredWorldPlayers = this.filteredWorldPlayers.sort((n1, n2) => n1.name > n2.name ? 1 : n1.name < n2.name ? -1 : 0);
        else
          this.filteredWorldPlayers = this.filteredWorldPlayers.sort((n1, n2) => n1.name > n2.name ? -1 : n1.name < n2.name ? 1 : 0);
        break;
      case CharacterSortFilterType.VOCATION:
        if (tuple[1] === SortDirectionType.ASCENDING)
          this.filteredWorldPlayers = this.filteredWorldPlayers.sort((a, b) => {
            const vocationA: string = VocationHelper.toVocation(a.vocation);
            const vocationB: string = VocationHelper.toVocation(b.vocation);
            return vocationA > vocationB ? 1 :
              vocationA < vocationB ? -1 :
                0;
          });
        else
          this.filteredWorldPlayers = this.filteredWorldPlayers.sort((a, b) => {
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
  }
}
