import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';

import { AllWorlds } from '../models/worlds/all-worlds.model';
import { World } from '../models/worlds/world.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorldService {

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private httpClient: HttpClient
  ) { }

  getAllWorlds(): Observable<Response<AllWorlds>> {
    return this.httpClient.get<Response<AllWorlds>>(this.baseUrl + `api/worlds/all`);
  }

  getWorld(name: string): Observable<Response<World>> {
    return this.httpClient.get<Response<World>>(this.baseUrl + `api/worlds/${name}`);
  }
}
