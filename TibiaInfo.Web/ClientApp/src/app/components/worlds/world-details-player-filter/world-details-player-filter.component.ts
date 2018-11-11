import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SimpleCharacter } from 'src/app/models/characters/simple-character.model';
import { CharacterSortFilterType } from 'src/app/enums/characer-sort-filter-type.enum';
import { ItemModel } from 'src/app/models/item.model';
import { SortDirectionType } from 'src/app/enums/sort-direction-type.enum';
import { Subscription } from 'rxjs';
import { VocationType } from 'src/app/enums/vocation-type.enum';

@Component({
  selector: 'app-world-details-player-filter',
  templateUrl: './world-details-player-filter.component.html',
  styleUrls: ['./world-details-player-filter.component.css']
})
export class WorldDetailsPlayerFilterComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() filterChangedEvent: EventEmitter<[string, CharacterSortFilterType, SortDirectionType, number]> = new EventEmitter<[string, CharacterSortFilterType, SortDirectionType, number]>();
  @Output() worldPlayerSelectedEvent: EventEmitter<string> = new EventEmitter<string>();
  @Input() filteredWorldPlayersOptions: string[] = [];

  private subscription: Subscription[] = [];
  worldPlayersSearchControl: FormControl = new FormControl();
  filteredWorldPlayers: SimpleCharacter[] = [];

  currentSearch: string = '';
  currentSortOrder: number = CharacterSortFilterType.NAME;
  sortOrders: ItemModel[] = [
    {
      id: CharacterSortFilterType.NAME,
      text: 'Name',
      selected: true
    }, {
      id: CharacterSortFilterType.LEVEL,
      text: 'Level',
      selected: false
    }, {
      id: CharacterSortFilterType.VOCATION,
      text: 'Vocation',
      selected: false
    }];
  currentSortDirection: ItemModel;
  sortDirections: ItemModel[] = [
    {
      id: SortDirectionType.ASCENDING,
      text: 'Ascending',
      selected: true
    }, {
      id: SortDirectionType.DESCENDING,
      text: 'Descending',
      selected: false
    }];
  currentSortVocation: ItemModel;
  sortVocations: ItemModel[] = [
    {
      id: -1,
      selected: true,
      text: 'All'
    },
    {
      id: VocationType.NONE,
      selected: false,
      text: 'None'
    }, {
      id: VocationType.DRUID,
      selected: false,
      text: 'Druid'
    },
    {
      id: VocationType.ELDER_DRUID,
      selected: false,
      text: 'Elder Druid'
    },
    {
      id: VocationType.KNIGHT,
      selected: false,
      text: 'Knight'
    },
    {
      id: VocationType.ELITE_KNIGHT,
      selected: false,
      text: 'Elite Knight'
    },
    {
      id: VocationType.SORCERER,
      selected: false,
      text: 'Sorcerer'
    },
    {
      id: VocationType.MASTER_SORCERER,
      selected: false,
      text: 'Master Sorcerer'
    },
    {
      id: VocationType.PALADIN,
      selected: false,
      text: 'Paladin'
    },
    {
      id: VocationType.ROYAL_PALADIN,
      selected: false,
      text: 'Royal Paladin'
    }]

  constructor() { }

  ngOnInit(): void {
    this.currentSortDirection = this.sortDirections[0];
    this.currentSortVocation = this.sortVocations[0];
  }

  ngAfterViewInit(): void {
    this.subscription.push(
      this.worldPlayersSearchControl.valueChanges
        .subscribe((value: string) => {
          this.currentSearch = value
          this.filterChangedEvent.emit([this.currentSearch, this.currentSortOrder, this.currentSortDirection.id, this.currentSortVocation.id]);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach(s => s.unsubscribe());
  }

  onWorldPlayerSelected(name: string): void {
    this.worldPlayerSelectedEvent.emit(name);
  }

  onSortOrderChange(sortOrder: number): void {
    this.filterChangedEvent.emit([this.currentSearch, sortOrder, this.currentSortDirection.id, this.currentSortVocation.id]);
  }

  onSortDirectionChange(sortDirection: number): void {
    this.filterChangedEvent.emit([this.currentSearch, this.currentSortOrder, sortDirection, this.currentSortVocation.id]);
  }

  onSortVocationChange(vocation: number): void {
    this.filterChangedEvent.emit([this.currentSearch, this.currentSortOrder, this.currentSortDirection.id, vocation]);
  }
}
