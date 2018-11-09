import { Component, OnInit } from '@angular/core';
import { HighscoreService } from 'src/app/services/highscore.service';
import { Subscription } from 'rxjs';
import { HighScoreType } from 'src/app/enums/highscore-type.enum';
import { VocationType } from 'src/app/enums/vocation-type.enum';
import { AppService } from 'src/app/services/app.service';
import { AllHighScores } from 'src/app/models/highscores/all-highscores.model';
import { SortDirectionType } from 'src/app/enums/sort-direction-type.enum';
import { HighScoreListFilterType } from 'src/app/enums/highscore-list-filter-type.enum';
import { HighScore } from 'src/app/models/highscores/highscore.model';
import { VocationHelper } from 'src/app/helpers/vocation.helpers';

@Component({
  selector: 'app-highscore-list',
  templateUrl: './highscore-list.component.html',
  styleUrls: ['./highscore-list.component.css']
})
export class HighscoreListComponent implements OnInit {

  isPageLoaded: boolean = false;
  showAdditionalFilters: boolean = false;
  isMainFilterEnabled: boolean = true;
  allHighScores: AllHighScores;
  filteredHighScores: HighScore[] = [];
  filteredCharacterOptions: string[] = [];

  private subscription: Subscription[] = [];

  constructor(
    private appService: AppService,
    private highScoreService: HighscoreService
  ) { }

  ngOnInit(): void {
    this.appService.changeMaintTitle('HighScores');
    this.appService.showBackButton(false);
  }

  searchHighScores(tuple: [string, HighScoreType, VocationType]): void {
    const world: string = tuple[0];
    const highScoreType: HighScoreType = tuple[1];
    const vocationType: VocationType = tuple[2];
    this.showAdditionalFilters =
      this.isMainFilterEnabled =
      this.isPageLoaded = false;

    this.appService.showMainProgressBar(true);
    this.subscription.push(
      this.highScoreService.getAllHighScores(world, highScoreType, vocationType).subscribe(r => {
        if (r.succeed) {
          this.allHighScores = r.result;
          this.showAdditionalFilters =
            this.isMainFilterEnabled =
            this.isPageLoaded = true;
        } else {
          this.appService.showMessage(`An error occurred while trying to get all the highscores for world : ${world}. ${r.message}`);
        }
      }, (_) => {
        this.appService.showMessage('An unkwnown error occurred while trying to get all the highscores');
      },
        () => this.appService.showMainProgressBar(false))
    )
  }

  sortHighScores(tuple: [string, HighScoreListFilterType, SortDirectionType]): void {
    const search: string = tuple[0].toLowerCase();
    const sortOrder: HighScoreListFilterType = tuple[1];
    const sortDirection: SortDirectionType = tuple[2];

    let highscores = this.allHighScores.highScore.filter(h => h.name.includes(search));
    switch (sortOrder) {
      case HighScoreListFilterType.LEVEL_POINTS:
        if (sortDirection === SortDirectionType.ASCENDING)
          highscores = highscores.sort((n1, n2) => n1.levelPoiints > n2.levelPoiints ? 1 : n1.levelPoiints < n2.levelPoiints ? -1 : 0);
        else
          highscores = highscores.sort((n1, n2) => n1.levelPoiints > n2.levelPoiints ? -1 : n1.levelPoiints < n2.levelPoiints ? 1 : 0);
        break;
      case HighScoreListFilterType.POINTS:
        if (sortDirection === SortDirectionType.ASCENDING)
          highscores = highscores.sort((n1, n2) => n1.points > n2.points ? 1 : n1.points < n2.points ? -1 : 0);
        else
          highscores = highscores.sort((n1, n2) => n1.points > n2.points ? -1 : n1.points < n2.points ? 1 : 0);
      case HighScoreListFilterType.VOCATION:
        if (sortDirection === SortDirectionType.ASCENDING)
          highscores = highscores.sort((n1, n2) => {
            const vocationA: string = VocationHelper.toVocation(n1.vocation);
            const vocationB: string = VocationHelper.toVocation(n2.vocation);
            return vocationA > vocationB ? 1 :
              vocationA < vocationB ? -1 : 0;
          });
        else
          highscores = highscores.sort((n1, n2) => {
            const vocationA: string = VocationHelper.toVocation(n1.vocation);
            const vocationB: string = VocationHelper.toVocation(n2.vocation);
            return vocationA > vocationB ? -1 :
              vocationA < vocationB ? 1 : 0;
          });
      default:
        if (sortDirection === SortDirectionType.ASCENDING)
          highscores = highscores.sort((n1, n2) => n1.rankPosition > n2.rankPosition ? 1 : n1.rankPosition < n2.rankPosition ? -1 : 0);
        else
          highscores = highscores.sort((n1, n2) => n1.rankPosition > n2.rankPosition ? -1 : n1.rankPosition < n2.rankPosition ? 1 : 0);
    }

    this.filteredHighScores = highscores;
    this.filteredCharacterOptions = highscores.map(h => h.name).sort();
  }
}
