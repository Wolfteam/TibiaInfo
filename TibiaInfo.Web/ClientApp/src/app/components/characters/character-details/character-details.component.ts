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
  private isInFavorites: boolean = false;
  private displayedColumns: string[] = ['name', 'world', 'status'];
  private characterNotFound: boolean = false;
  //dataSource: MatTableDataSource<OtherCharacter>;
  //@ViewChild(MatSort) sort: MatSort;

  constructor(
    private activatedRoute: ActivatedRoute,
    private characterService: CharacterService,
    private appService: AppService) { }

  ngOnInit() {
    this.appService.showBackButton(true);
    this.appService.setBackRouterPath('/characters');

    this.activatedRoute.paramMap.subscribe(params => {
      this.appService.showMainProgressBar(true);
      const charName = params.get('name');
      if (charName === null || charName == '') {
        this.appService.showMainProgressBar(false);
        this.appService.showMessage('You need to provide a valid name.');
        return;
      }

      this.characterService.getCharacter(charName).subscribe(response => {
        if (response.succeed) {
          this.character = response.result;
          this.isInFavorites = this.characterService.characterExistsInCache(response.result.name);
          //this.dataSource = new MatTableDataSource(response.result.otherCharacters);
          //this.dataSource.sort = this.sort;
          this.isPageLoaded = true;
          this.appService.changeMaintTitle(`Characters - ${response.result.name}`);
        }
        else {
          this.appService.showMessage('An error occurred while trying to get the character. ' + response.message);
          if (response.message.toLowerCase().includes('character does not exist')) {
            this.characterNotFound = true;
            this.appService.changeMaintTitle(`Characters - Not Found`);
          }
        }
      },
        (error) => {
          console.log(error);
          this.appService.showMessage('An unknown error occurred.');
          this.appService.showMainProgressBar(false);
        },
        () => this.appService.showMainProgressBar(false)
      );
    });
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
