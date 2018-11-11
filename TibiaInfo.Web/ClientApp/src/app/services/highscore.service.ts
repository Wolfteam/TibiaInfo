import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HighScoreType } from '../enums/highscore-type.enum';
import { VocationType } from '../enums/vocation-type.enum';
import { AllHighScores } from '../models/highscores/all-highscores.model';
import { Observable, throwError } from 'rxjs';
import { Response } from '../models/response.model';
import { catchError } from 'rxjs/operators';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private appService: AppService,
    private httpClient: HttpClient
  ) { }

  getAllHighScores(world: string, highScoreType: HighScoreType, vocationType: VocationType): Observable<Response<AllHighScores>> {
    return this.httpClient.get<Response<AllHighScores>>(`${this.baseUrl}api/highscores/${world}/${highScoreType}/${vocationType}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.log(error);
    this.appService.showMainProgressBar(false);
    return throwError(error);
  }
}
