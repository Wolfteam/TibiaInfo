import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { News } from 'src/app/models/news/news.model';
import { AppService } from 'src/app/services/app.service';
import { NewsService } from 'src/app/services/news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})
export class NewsDetailsComponent implements OnInit {

  private isPageLoaded: boolean = false;
  private subscriptions: Subscription[] = [];
  private news: News;

  constructor(
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private newsService: NewsService
  ) { }

  ngOnInit() {
    this.appService.showMainProgressBar(true);
    this.appService.showBackButton(true);
    this.appService.setBackRouterPath('/news');

    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe(params => {
        const newsID = +params.get('id');
        if (newsID === null || newsID <= 0) {
          this.appService.showMainProgressBar(false);
          this.appService.showMessage('You need to provide a valid news id.');
          return;
        }
        this.newsService.getNews(newsID).subscribe(r => {
          if (r.succeed) {
            this.appService.changeMaintTitle(`News - ${r.result.title}`);
            this.news = r.result;
            this.isPageLoaded = true;
          } else {
            this.appService.showMessage(`An error occurred while trying to get the guild. ${r.message}`);
          }
        }, (error) => {
          console.log(error);
          this.appService.showMessage('An unknown error occurred.');
          this.appService.showMainProgressBar(false);
        },
          () => this.appService.showMainProgressBar(false))
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
