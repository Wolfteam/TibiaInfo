import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response.model';
import { AllHouses } from '../models/houses/all-houses.model';
import { TownsType } from '../enums/towns-type.enum';
import { HouseType } from '../enums/house-type.enum';
import { House } from '../models/houses/house.model';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private httpClient: HttpClient
  ) { }


  public getAllHouses(world: string, townType: TownsType, houseType: HouseType, status: number = -1, orderBy: string = "", sortDirection: number = 0): Observable<Response<AllHouses>> {
    return this.httpClient.get<Response<AllHouses>>(`${this.baseUrl}api/houses/all/${world}/${townType}/${houseType}?status=${status}&orderBy=${orderBy}&sortDirection=${sortDirection}`);
  }

  public getHouse(world: string, id: number): Observable<Response<House>> {
    return this.httpClient.get<Response<House>>(`${this.baseUrl}api/houses/${world}/${id}`);
  }
}
