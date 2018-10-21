import { Injectable, Inject } from '@angular/core';
import { SimpleCharacter } from '../models/characters/simple-character.model';
import { Response } from '../models/response.model';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Character } from '../models/characters/character.model';

const CHARS_COOKIE_NAME: string = 'SAVED_CHARS_COOKIE';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private defaultChars = 'kharsek,gumi,makoto,yuri,wolfteam knight,haruka nozaki,makoto kun,hecks leads,wolfteam sorcerer,deamon lothbrok,ferxo nekro,kimz corleone';

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private httpClient: HttpClient,
    private cookieService: CookieService) { }


  getCachedCharacterNames(): string {
    const chars = this.cookieService.get(CHARS_COOKIE_NAME);
    if (chars !== undefined && chars !== null && chars.length > 0) {
      console.log("Chars are returned from cookie");
      return chars;
    }
    else {
      console.log("Chars are returned from property");
      this.cookieService.set(CHARS_COOKIE_NAME, this.defaultChars, null, '/');
      return this.defaultChars;
    }
  }

  removeCachedCharacterName(name: string): void {
    const charName = name.toLowerCase().trim();
    const chars: string[] = this.cookieService.get(CHARS_COOKIE_NAME).split(',');
    const index = chars.indexOf(charName, 0);
    if (index > -1) {
      chars.splice(index, 1);
      this.cookieService.set(CHARS_COOKIE_NAME, chars.join(','), null, '/');
    }
  }

  addCachedCharacterName(name: string): void {
    const loweredName: string = name.toLowerCase();
    let currentChars: string[] = this.cookieService.get(CHARS_COOKIE_NAME).split(',');
    if (!currentChars.includes(loweredName))
      currentChars.push(loweredName);
    this.cookieService.set(CHARS_COOKIE_NAME, currentChars.join(','), null, '/');
  }

  characterExistsInCache(name: string): boolean {
    const loweredName: string = name.toLowerCase();
    const currentChars: string[] = this.cookieService.get(CHARS_COOKIE_NAME).split(',');
    return currentChars.includes(loweredName);
  }

  getCharacter(name: string): Observable<Response<Character>> {
    return this.httpClient.get<Response<Character>>(this.baseUrl + `api/Characters/${name}`);
  }

  getCharacters(names: string): Observable<Response<SimpleCharacter[]>> {
    return this.httpClient.get<Response<SimpleCharacter[]>>(this.baseUrl + `api/Characters/all/${names}`);
  }
}
