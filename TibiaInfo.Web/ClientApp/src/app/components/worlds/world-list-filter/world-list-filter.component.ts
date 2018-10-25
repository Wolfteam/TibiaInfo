import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { ItemModel } from 'src/app/models/item.model';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-world-list-filter',
  templateUrl: './world-list-filter.component.html',
  styleUrls: ['./world-list-filter.component.css']
})
export class WorldListFilterComponent implements OnInit, OnDestroy {

  @Output() public worldSearchTextChangedEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() public orderBySelectionChangedEvent: EventEmitter<number> = new EventEmitter<number>();
  @Input() public filteredWorldOptions: string[] = [];

  private subscriptions: Subscription[] = [];
  private worldSearchControl = new FormControl();
  private currentSortOrder: number = 1;
  private orderBy: ItemModel[] = [{
    id: 1,
    text: 'Name',
    selected: true
  }, {
    id: 2,
    text: 'Players Online',
    selected: false
  }];

  constructor() { }

  ngOnInit() {
    this.worldSearchControl
      .valueChanges
      .subscribe((value: string) => {
        this.worldSearchTextChangedEvent.emit(value);
        this.orderBySelectionChangedEvent.emit(this.currentSortOrder);
      })
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private onOrderBySelectionChanged(value: number) {
    this.orderBySelectionChangedEvent.emit(value);
  }
}
