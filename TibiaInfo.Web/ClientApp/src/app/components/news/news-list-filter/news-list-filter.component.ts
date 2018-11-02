import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { SortDirectionType } from 'src/app/enums/sort-direction-type.enum';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ItemModel } from 'src/app/models/item.model';
import { NewsListSortFilterType } from 'src/app/enums/news-list-sort-filter-type.enum';
import { NewsType } from 'src/app/enums/news-type.enum';

@Component({
  selector: 'app-news-list-filter',
  templateUrl: './news-list-filter.component.html',
  styleUrls: ['./news-list-filter.component.css']
})
export class NewsListFilterComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() public filterChangedEvent: EventEmitter<[string, NewsListSortFilterType, SortDirectionType, number]> = new EventEmitter<[string, NewsListSortFilterType, SortDirectionType, number]>();
  @Input() public filteredNewsOptions: string[] = [];

  private subscriptions: Subscription[] = [];
  private newsSearchControl = new FormControl();
  private currentSearch: string = '';
  private currentSortOrder: number = NewsListSortFilterType.CREATION_DATE;
  private sortOrders: ItemModel[] = [
    {
      id: NewsListSortFilterType.TITLE,
      text: 'Title',
      selected: false
    }, {
      id: NewsListSortFilterType.CREATION_DATE,
      text: 'Creation date',
      selected: true
    }];
  private currentSortDirection: ItemModel;
  private sortDirections: ItemModel[] = [
    {
      id: SortDirectionType.ASCENDING,
      text: 'Ascending',
      selected: false
    }, {
      id: SortDirectionType.DESCENDING,
      text: 'Descending',
      selected: true
    }];
  private currentNewsType: ItemModel;
  private newsTypes: ItemModel[] = [
    {
      id: -1,
      selected: true,
      text: 'All'
    },
    {
      id: NewsType.FEATURED_ARTICLE,
      selected: false,
      text: 'Featured Article'
    }, {
      id: NewsType.LATEST_NEWS,
      selected: false,
      text: 'Lastest News'
    }, {
      id: NewsType.NEWS_TICKER,
      selected: false,
      text: 'News Tickers'
    }];

  constructor() { }

  ngOnInit(): void {
    this.currentSortDirection = this.sortDirections[1];
    this.currentNewsType = this.newsTypes[0];
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.newsSearchControl.valueChanges
        .subscribe((value: string) => {
          this.currentSearch = value;
          this.filterChangedEvent.emit([this.currentSearch, this.currentSortOrder, this.currentSortDirection.id, -1]);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private onSortDirectionChange(sortDirection: SortDirectionType): void {
    this.filterChangedEvent.emit([this.currentSearch, this.currentSortOrder, sortDirection, this.currentNewsType.id]);
  }

  private onOrderChange(sortOrder: NewsListSortFilterType): void {
    this.filterChangedEvent.emit([this.currentSearch, sortOrder, this.currentSortDirection.id, this.currentNewsType.id]);
  }

  private onNewsTypeChange(newsType: number): void {
    this.filterChangedEvent.emit([this.currentSearch, this.currentSortOrder, this.currentSortDirection.id, newsType]);
  }
}
