import { Injectable } from '@angular/core';
import { SkyAppConfig } from '@skyux/config';
import { HttpClient } from '@angular/common/http';
import { skyAuthHttpOptions } from '@skyux/http';
import { Observable } from 'rxjs/Observable';
import { REQUEST_OPTIONS } from './common-headers';
import { FoodItem } from '../../models/FoodItem';

@Injectable()
export class PocketPantryService {

  private readonly brokerUrl: string = 'https://localhost:5001/';
  constructor(protected http: HttpClient,
              private skyAppConfig: SkyAppConfig
              ) {
  }

  public getUser(user: string): Observable<any> {
    return this.http.get<any>(`${this.brokerUrl}api/pantry/user/${user}`, skyAuthHttpOptions(REQUEST_OPTIONS));
  }

  public getPantry(user: string): Observable<any> {
    return this.http.get<any>(`${this.brokerUrl}api/pantry/user${user}`, skyAuthHttpOptions(REQUEST_OPTIONS));
  }

  public addFood(food: FoodItem): Observable<any> {
    return this.http.post<any>(`${this.brokerUrl}api/pantry/food/${food.name}`, food, skyAuthHttpOptions(REQUEST_OPTIONS));
  }

}
