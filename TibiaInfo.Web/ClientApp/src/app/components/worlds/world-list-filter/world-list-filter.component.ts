import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { WorldListSortFilterType } from 'src/app/enums/world-list-sort-filter-type.enum';
import { SortDirectionType } from 'src/app/enums/sort-direction-type.enum';
import { WorldPvPType } from 'src/app/enums/world-pvp-type.enum';

@Component({
  selector: 'app-world-list-filter',
  templateUrl: './world-list-filter.component.html',
  styleUrls: ['./world-list-filter.component.css']
})
export class WorldListFilterComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() filterChangedEvent: EventEmitter<[string, WorldListSortFilterType, SortDirectionType, number]> = new EventEmitter<[string, WorldListSortFilterType, SortDirectionType, number]>();
  @Input() filteredWorldOptions: string[] = [];

  private subscriptions: Subscription[] = [];
  worldSearchControl = new FormControl();
  currentSearch: string = '';
  currentSortOrder: number = WorldListSortFilterType.NAME;
  sortOrders: ItemModel[] = [
    {
      id: WorldListSortFilterType.NAME,
      text: 'Name',
      selected: true
    }, {
      id: WorldListSortFilterType.PLAYERS_ONLINE,
      text: 'Players Online',
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
  currentSortPvpType: ItemModel;
  sortPvpTypes: ItemModel[] = [
    {
      id: -1,
      text: 'All',
      selected: false
    }, {
      id: WorldPvPType.OPTIONAL_PVP,
      text: 'Optional PvP',
      selected: false
    }, {
      id: WorldPvPType.OPEN_PVP,
      text: 'Open PvP',
      selected: false
    }, {
      id: WorldPvPType.HARDCORE_PVP,
      text: 'Hardcore PvP',
      selected: false
    }, {
      id: WorldPvPType.RETRO_OPEN_PVP,
      text: 'Retro Open PvP',
      selected: false
    }, {
      id: WorldPvPType.RETRO_HARDCORE_PVP,
      text: 'Retro Hardcore PvP',
      selected: false
    }]

  constructor() { }

  ngOnInit(): void {
    this.currentSortDirection = this.sortDirections[0];
    this.currentSortPvpType = this.sortPvpTypes[0];
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.worldSearchControl.valueChanges
        .subscribe((value: string) => {
          this.currentSearch = value;
          this.filterChangedEvent.emit([this.currentSearch, this.currentSortOrder, this.currentSortDirection.id, this.currentSortPvpType.id]);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onOrderOrderChange(sortOrder: number): void {
    this.filterChangedEvent.emit([this.currentSearch, sortOrder, this.currentSortDirection.id, this.currentSortPvpType.id]);
  }

  onSortDirectionChange(sortMode: number): void {
    this.filterChangedEvent.emit([this.currentSearch, this.currentSortOrder, sortMode, this.currentSortPvpType.id]);
  }

  onSortPvPTypeChange(sortPvp: number): void {
    this.filterChangedEvent.emit([this.currentSearch, this.currentSortOrder, this.currentSortDirection.id, sortPvp]);
  }
}
