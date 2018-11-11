import { Component, OnInit, Input } from '@angular/core';
import { HighScore } from 'src/app/models/highscores/highscore.model';
import { HighScoreType } from 'src/app/enums/highscore-type.enum';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})
export class HighscoreComponent implements OnInit {

  @Input() highscore: HighScore;
  @Input() currentHighScoreType: HighScoreType;
  
  constructor() { }

  ngOnInit() {
  }

}
