import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SimpleCharacter } from '../../../models/characters/simple-character.model';
import { CharacterService } from '../../../services/character.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  @Input() character: SimpleCharacter;
  @Output() characterRemoved: EventEmitter<SimpleCharacter> = new EventEmitter<SimpleCharacter>();

  constructor(private router: Router) {}

  ngOnInit() {
  }

  removeCharacter(): void {
    this.characterRemoved.emit(this.character);
  }

  showDetails() {
    this.router.navigate(['/character', this.character.name])
  }
}
