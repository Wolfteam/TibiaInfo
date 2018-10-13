import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { Response } from '../models/response.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { SexType } from '../models/sexType.enum';
import { VocationType } from '../models/vocationType.enum';
import { VocationHelper } from '../helpers/vocation.helpers';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private httpClient: HttpClient) { }


  getCachedCharacterNames(): string[] {
    return Array.of('gumi', 'makoto', 'yuri');
  }

  getCharacter(name: string): Observable<Response<Character>> {

    return this.httpClient.get<Response<Character>>(`http://localhost:5000/api/Character/${name}`);
  }
}
