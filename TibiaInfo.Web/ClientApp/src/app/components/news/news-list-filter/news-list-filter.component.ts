import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { SortDirectionType } from 'src/app/enums/sort-direction-type.enum';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ItemModel } from 'src/app/models/item.model';
import { NewsListSortFilterType } from 'src/app/enums/news-list-sort-filter-type.enum';
import { NewsType } from 'src/app/enums/news-type.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-news-list-filter',
  templateUrl: './news-list-filter.component.html',
  styleUrls: ['./news-list-filter.component.css']
})
export class NewsListFilterComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() filterChangedEvent: EventEmitter<[string, NewsListSortFilterType, SortDirectionType]> = new EventEmitter<[string, NewsListSortFilterType, SortDirectionType]>();
  @Output() searchNewsEvent: EventEmitter<NewsType> = new EventEmitter<NewsType>();
  @Input() filteredNewsOptions: string[] = [];
  @Input() isPageLoaded: boolean = false;
  private _isNewsTypeSelectControlEnabled: boolean = true;
  @Input()
  get isNewsTypeSelectControlEnabled(): boolean {
    return this._isNewsTypeSelectControlEnabled;
  }
  set isNewsTypeSelectControlEnabled(isEnabled: boolean) {
    this._isNewsTypeSelectControlEnabled = isEnabled;
    if (!isEnabled)
      this.newsTypeSelectControl.disable();
    else
      this.newsTypeSelectControl.enable();
  }

  private subscriptions: Subscription[] = [];
  newsSearchControl = new FormControl();
  newsTypeSelectControl = new FormControl();

  currentSearch: string = '';
  currentSortOrder: number = NewsListSortFilterType.CREATION_DATE;
  sortOrders: ItemModel[] = [
    {
      id: NewsListSortFilterType.TITLE,
      text: 'Title',
      selected: false
    }, {
      id: NewsListSortFilterType.CREATION_DATE,
      text: 'Creation date',
      selected: true
    }];
  currentSortDirection: ItemModel;
  sortDirections: ItemModel[] = [
    {
      id: SortDirectionType.ASCENDING,
      text: 'Ascending',
      selected: false
    }, {
      id: SortDirectionType.DESCENDING,
      text: 'Descending',
      selected: true
    }];
  currentNewsType: NewsType;
  newsTypes: ItemModel[] = [
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentSortDirection = this.sortDirections[1];
    const newsTypeParam = +this.activatedRoute.snapshot.queryParamMap.get('newsType');
    const currentNewsType = !isNaN(newsTypeParam) && this.activatedRoute.snapshot.queryParamMap.has('newsType') ?
      this.newsTypes.find(nt => nt.id === newsTypeParam).id : NewsType.LATEST_NEWS;
    this.currentNewsType = currentNewsType;
    this.newsTypeSelectControl.setValue(currentNewsType)

    if (this.activatedRoute.snapshot.queryParamMap.has('newsType')) {
      setTimeout(() => this.searchNews());
      // this.loadFromParams = true;
    }
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.newsSearchControl.valueChanges
        .subscribe((value: string) => {
          this.currentSearch = value;
          this.filterChangedEvent.emit([this.currentSearch, this.currentSortOrder, this.currentSortDirection.id]);
        })
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  searchNews(): void {
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        newsType: this.currentNewsType
      },
      // preserve the existing query params in the route
      queryParamsHandling: 'merge',
      // do not trigger navigation
      skipLocationChange: false
    });
    this.searchNewsEvent.emit(this.currentNewsType);
  }

  onSortDirectionChange(sortDirection: SortDirectionType): void {
    this.filterChangedEvent.emit([this.currentSearch, this.currentSortOrder, sortDirection]);
  }

  onOrderChange(sortOrder: NewsListSortFilterType): void {
    this.filterChangedEvent.emit([this.currentSearch, sortOrder, this.currentSortDirection.id]);
  }
}
