import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CharacterService } from '../../../services/character.service';
import { Character } from '../../../models/characters/character.model';
import { AppService } from '../../../services/app.service';
import { AccountStatusType } from '../../../enums/account-status-type.enum';
import { range } from 'rxjs';
import { MatTableDataSource, MatSort } from '@angular/material';
import { OtherCharacter } from '../../../models/shared/other-character.model';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.css']
})
export class CharacterDetailsComponent implements OnInit {

  private isPageLoaded: boolean;
  private character: Character;
  //color = "accent" : "warn"
  private isInFavorites: boolean = false;
  displayedColumns: string[] = ['name', 'world', 'status'];
  //TODO: IMPROVE THE UI HERE
  //TODO: SHOW A DIFFERENT COLOR IF THE CHAR IS IN THE FAVORITES COOKIE
  //TODO: SHOW A NOT FOUND IF THE CHARACTER DOES NOT EXISTS
  //TODO: REMOVE console.logs
  //dataSource: MatTableDataSource<OtherCharacter>;
  //@ViewChild(MatSort) sort: MatSort;

  constructor(
    private activatedRoute: ActivatedRoute,
    private characterService: CharacterService,
    private appService: AppService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.appService.showMainProgressBar(true);
      const charName = params.get('name');
      if (charName === null || charName == '') {
        this.appService.showMainProgressBar(false);
        this.appService.showMessage('You need to provide a valid name.');
        return;
      }

      this.characterService.getCharacter(charName)
        .subscribe(response => {
          if (response.succeed) {
            this.character = response.result;
            this.isInFavorites = this.characterService.characterExistsInCache(response.result.name);
            //this.dataSource = new MatTableDataSource(response.result.otherCharacters);
            //this.dataSource.sort = this.sort;
            this.isPageLoaded = true;
          }
          else
            this.appService.showMessage('An error occurred while trying to get the character. ' + response.message);
          this.appService.changeMaintTitle(`Characters - ${response.result.name}`);
        },
          (error) => this.appService.showMessage('An unknown error occured.' + error),
          () => this.appService.showMainProgressBar(false)
        );
    });

    this.appService.showBackButton(true);
  }

  getStarsArray(stars: number) {
    let array = Array<number>();
    for (var i = 0; i < stars; i++) {
      array.push(i);
    }
    return array;
  }

  saveToFavorites(): void {
    this.appService.showMainProgressBar(true);
    if (this.isInFavorites)
      this.characterService.removeCachedCharacterName(this.character.name);
    else
      this.characterService.addCachedCharacterName(this.character.name);
    this.appService.showMainProgressBar(false);
    this.appService.showMessage(`${this.character.name} was ${(this.isInFavorites) ? 'removed from ' : 'added to'} your favorite list`);
    this.isInFavorites = !this.isInFavorites;
  }
}
