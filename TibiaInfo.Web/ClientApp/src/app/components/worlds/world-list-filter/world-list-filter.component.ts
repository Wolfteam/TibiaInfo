import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { WorldListSortFilterType } from 'src/app/enums/world-list-sort-filter-type.enum';
import { SortDirectionType } from 'src/app/enums/sort-direction-type.enum';

@Component({
  selector: 'app-world-list-filter',
  templateUrl: './world-list-filter.component.html',
  styleUrls: ['./world-list-filter.component.css']
})
export class WorldListFilterComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() public worldSearchTextChangedEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() public sortChangedEvent: EventEmitter<[WorldListSortFilterType, SortDirectionType]> = new EventEmitter<[WorldListSortFilterType, SortDirectionType]>();
  @Input() public filteredWorldOptions: string[] = [];

  private subscriptions: Subscription[] = [];
  private worldSearchControl = new FormControl();
  private currentSortOrder: number = WorldListSortFilterType.NAME;
  private sortOrders: ItemModel[] = [{
    id: WorldListSortFilterType.NAME,
    text: 'Name',
    selected: true
  }, {
    id: WorldListSortFilterType.PLAYERS_ONLINE,
    text: 'Players Online',
    selected: false
  }];
  private currentSortDirection: ItemModel;
  private sortDirections: ItemModel[] = [{
    id: SortDirectionType.ASCENDING,
    text: 'Ascending',
    selected: true
  }, {
    id: SortDirectionType.DESCENDING,
    text: 'Descending',
    selected: false
  }];

  constructor() {
  }

  ngOnInit(): void {
    this.currentSortDirection = this.sortDirections[0];
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.worldSearchControl.valueChanges
        .subscribe((value: string) => {
          this.worldSearchTextChangedEvent.emit(value);
          this.sortChangedEvent.emit([this.currentSortOrder, this.currentSortDirection.id]);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private onOrderOrderChange(sortOrder: number): void {
    this.sortChangedEvent.emit([sortOrder, this.currentSortDirection.id]);
  }

  private onSortDirectionChange(sortMode: number): void {
    this.sortChangedEvent.emit([this.currentSortOrder, sortMode]);
  }
}
