import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { NewsService } from 'src/app/services/news.service';
import { Subscription } from 'rxjs';
import { NewsType } from 'src/app/enums/news-type.enum';
import { AllNews } from 'src/app/models/news/all-news.model';
import { NewsListSortFilterType } from 'src/app/enums/news-list-sort-filter-type.enum';
import { SortDirectionType } from 'src/app/enums/sort-direction-type.enum';
import { SimpleNews } from 'src/app/models/news/simple-news.model';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit, OnDestroy {

  isPageLoaded: boolean = false;
  private subscriptions: Subscription[] = [];
  private allNews: AllNews;
  filteredNews: SimpleNews[] = [];
  filteredNewsOptions: string[] = [];
  isNewsTypeSelectControlEnabled: boolean = true;

  constructor(
    private appService: AppService,
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.appService.changeMaintTitle('News');
    this.appService.showBackButton(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  searchNews(newsType: NewsType): void {
    this.isPageLoaded =
      this.isNewsTypeSelectControlEnabled = false;
    this.appService.showMainProgressBar(true)
    this.subscriptions.push(
      this.newsService.getAllNews(newsType).subscribe(r => {
        if (r.succeed) {
          this.allNews = r.result;
          this.isPageLoaded = true;
          this.sortNews(['', NewsListSortFilterType.CREATION_DATE, SortDirectionType.DESCENDING]);
        } else {
          this.appService.showMessage(`An error occurred while trying to get all the lastest news. ${r.message}`);
        }
        this.isNewsTypeSelectControlEnabled = true;
      },
        (error) => {
          this.appService.showMainProgressBar(false)
          console.log(error);
          this.appService.showMessage(`An unknown error occurred while trying to get the lastest news.`);
        },
        () => this.appService.showMainProgressBar(false)
      ));
  }

  sortNews(tuple: [string, NewsListSortFilterType, SortDirectionType]): void {
    const search: string = tuple[0].toLowerCase();
    const sortOrder: NewsListSortFilterType = tuple[1];
    const sortDirection: SortDirectionType = tuple[2];

    let news: SimpleNews[] = this.allNews.news.filter(n => n.title.toLowerCase().includes(search));

    switch (sortOrder) {
      case NewsListSortFilterType.CREATION_DATE:
        if (sortDirection === SortDirectionType.ASCENDING)
          news = news.sort((n1, n2) => n1.createdAt.date > n2.createdAt.date ? 1 : n1.createdAt.date < n2.createdAt.date ? -1 : 0)
        else
          news = news.sort((n1, n2) => n1.createdAt.date > n2.createdAt.date ? -1 : n1.createdAt.date < n2.createdAt.date ? 1 : 0)
        break;
      case NewsListSortFilterType.TITLE:
        if (sortDirection === SortDirectionType.ASCENDING)
          news = news.sort((n1, n2) => n1.title > n2.title ? 1 : n1.title < n2.title ? -1 : 0)
        else
          news = news.sort((n1, n2) => n1.title > n2.title ? -1 : n1.title < n2.title ? 1 : 0)
        break;
      // case NewsListSortFilterType.TYPE:
      //   if (sortDirection === SortDirectionType.ASCENDING)
      //     news = news.sort((n1, n2) => {
      //       const a1 = NewsType[n1.type];
      //       const a2 = NewsType[n2.type];
      //       return a1 > a2 ? 1 : a1 < a2 ? -1 : 0
      //     });
      //   else 
      //   news = news.sort((n1, n2) => {
      //     const a1 = NewsType[n1.type];
      //     const a2 = NewsType[n2.type];
      //     return a1 > a2 ? -1 : a1 < a2 ? 1 : 0
      //   });
      //   break;
      default:
        break;
    }

    this.filteredNewsOptions = news.map(n => n.title).sort();
    this.filteredNews = news;
  }
}
