import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';
import { AllNews } from '../models/news/all-news.model';
import { NewsType } from '../enums/news-type.enum';
import { News } from '../models/news/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private httpClient: HttpClient
  ) { }

  public getAllNews(newsType: NewsType): Observable<Response<AllNews>> {
    return this.httpClient.get<Response<AllNews>>(`${this.baseUrl}api/news/all/${newsType}`);
  }

  public getNews(id: number): Observable<Response<News>> {
    return this.httpClient.get<Response<News>>(`${this.baseUrl}api/news/${id}`);
  }
}
