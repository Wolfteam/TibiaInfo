import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SimpleCharacter } from '../../../models/characters/simple-character.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  @Input() public character: SimpleCharacter;
  @Output() public characterRemoved: EventEmitter<SimpleCharacter> = new EventEmitter<SimpleCharacter>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  private removeCharacter(): void {
    this.characterRemoved.emit(this.character);
  }

  private showDetails(): void {
    this.router.navigate(['/character', this.character.name])
  }
}
