import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response.model';
import { AllGuilds } from '../models/guilds/all-guilds.model';
import { Observable } from 'rxjs';
import { Guild } from '../models/guilds/guild.model';

@Injectable({
  providedIn: 'root'
})
export class GuildService {

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private httpClient: HttpClient
  ) { }

  public getAllGuilds(world: string): Observable<Response<AllGuilds>> {
    return this.httpClient.get<Response<AllGuilds>>(`${this.baseUrl}api/guilds/all/${world}`);
  }

  public getGuild(name: string): Observable<Response<Guild>> {
    return this.httpClient.get<Response<Guild>>(`${this.baseUrl}api/guilds/${name}`);
  }
}
