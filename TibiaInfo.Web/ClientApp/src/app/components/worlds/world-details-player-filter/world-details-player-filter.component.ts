import { Component, OnInit, AfterViewInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SimpleCharacter } from 'src/app/models/characters/simple-character.model';
import { CharacterSortFilterType } from 'src/app/enums/characer-sort-filter-type.enum';
import { ItemModel } from 'src/app/models/item.model';
import { SortDirectionType } from 'src/app/enums/sort-direction-type.enum';
import { Subscription } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-world-details-player-filter',
  templateUrl: './world-details-player-filter.component.html',
  styleUrls: ['./world-details-player-filter.component.css']
})
export class WorldDetailsPlayerFilterComponent implements OnInit, AfterViewInit {

  @Output() public worldPlayerSearchTextChangedEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() public sortChangedEvent: EventEmitter<[CharacterSortFilterType, SortDirectionType]> = new EventEmitter<[CharacterSortFilterType, SortDirectionType]>();
  @Input() public filteredWorldPlayersOptions: string[] = [];

  @ViewChild('worldPlayersViewPort') worldPlayersViewPort: CdkVirtualScrollViewport;

  private subscription: Subscription[] = [];
  private worldPlayersSearchControl: FormControl = new FormControl();
  private filteredWorldPlayers: SimpleCharacter[] = [];

  private currentSortOrder: number = CharacterSortFilterType.NAME;
  private sortOrders: ItemModel[] = [{
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

  constructor() { }

  ngOnInit(): void {
    this.currentSortDirection = this.sortDirections[0];
  }

  ngAfterViewInit(): void {
    this.subscription.push(
      this.worldPlayersSearchControl.valueChanges
        .subscribe((value: string) => {
          this.worldPlayerSearchTextChangedEvent.emit(value);
          this.sortChangedEvent.emit([this.currentSortOrder, this.currentSortDirection.id]);
        })
    );
  }

  private onWorldPlayerSelected(name: string): void {
    this.worldPlayersViewPort.scrollTo({
      start: 0,
      top: 0
    });
  }

  private onSortOrderChange(sortOrder: number): void {
    this.sortChangedEvent.emit([sortOrder, this.currentSortDirection.id]);
  }

  private onSortDirectionChange(sortMode: number): void {
    this.sortChangedEvent.emit([this.currentSortOrder, sortMode]);
  }
}
