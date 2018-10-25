import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimpleCharacter } from '../../../models//characters/simple-character.model';
import { SexType } from '../../../enums/sex-type.enum';
import { VocationType } from '../../../enums/vocation-type.enum';
import { CharacterService } from '../../../services/character.service';
import { pipe, Subscription } from 'rxjs'
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  characters: SimpleCharacter[] = [];

  constructor(private appService: AppService, private characterService: CharacterService) { }

  ngOnInit() {
    this.appService.changeMaintTitle('Characters');
    this.appService.showMainProgressBar(true)
    this.appService.showBackButton(false);

    const charNames: string = this.characterService.getCachedCharacterNames()
    this.subscriptions.push(this.characterService.getCharacters(charNames)
      .subscribe(response => {
        if (response.succeed) {
          console.log(response.result);
          this.characters = response.result.sort((c1, c2) => {
            if (c1.name > c2.name)
              return 1;

            if (c1.name < c2.name)
              return -1;

            return 0;
          });
        } else {
          this.appService.showMessage('An error occurred while trying to get the character. ' + response.message);
        }
      },
        (error) => this.appService.showMessage('An unknown error occurred while trying to get the character. ' + error),
        () => this.appService.showMainProgressBar(false)
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onCharacterRemoved(character: SimpleCharacter): void {
    this.characterService.removeCachedCharacterName(character.name);
    const index = this.characters.findIndex(c => c.name === character.name);
    if (index > -1) {
      this.characters.splice(index, 1);
      this.appService.showMessage(`${character.name} was removed from your favorite list`);
    }
  }
}
