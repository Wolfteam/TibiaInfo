import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-character-search',
  templateUrl: './character-search.component.html',
  styleUrls: ['./character-search.component.css']
})
export class CharacterSearchComponent implements OnInit {
  characterSearch: string = '';

  constructor(
    private router: Router,
    private appService: AppService
  ) { }

  ngOnInit() {
  }

  searchCharacter(): void {
    if (this.characterSearch === null || this.characterSearch === '') {
      this.appService.showMessage("You need to provide a character name");
      return;
    }
    this.router.navigate(['/character', this.characterSearch]);
  }

}
