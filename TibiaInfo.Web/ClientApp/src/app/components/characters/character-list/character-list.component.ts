import { Component, OnInit } from '@angular/core';
import { Character } from '../../../models/character.model';
import { SexType } from '../../../models/sexType.enum';
import { VocationType } from '../../../models/vocationType.enum';
import { CharacterService } from '../../../services/character.service';


@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];

  constructor(private characterService: CharacterService) { }

  ngOnInit() {
    var charNames = this.characterService.getCachedCharacterNames()
    charNames.forEach(charName => {
      this.characterService.getCharacter(charName)
        .subscribe(response => {
          if (response.succeed) {
            console.log(response.result);
            this.characters.push(response.result)
          }
        });
    });
  }

}
