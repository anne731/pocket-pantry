import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { skyAuthHttpOptions } from '@skyux/http';
import { Observable } from 'rxjs/Observable';
import { REQUEST_OPTIONS } from './common-headers';

@Injectable()
export class PocketPantryService {

  private readonly brokerUrl: string = 'https://localhost:5001/';
  constructor(
    protected http: HttpClient
              ) {
  }

  public getUser(user: string): Observable<any> {
    return this.http.get<any>(`${this.brokerUrl}api/pantry/user/${user}`, skyAuthHttpOptions(REQUEST_OPTIONS));
  }

  public getPantry(user: string): Observable<any> {
    return this.http.get<any>(`${this.brokerUrl}api/pantry/pantry/${user}`, skyAuthHttpOptions(REQUEST_OPTIONS));
  }

  public getFridge(user: string): Observable<any> {
    return this.http.get<any>(`${this.brokerUrl}api/pantry/fridge/${user}`, skyAuthHttpOptions(REQUEST_OPTIONS));
  }

  public addFood(food: string[]): Observable<any> {
    return this.http.post<any>(`${this.brokerUrl}api/pantry/food/`, food, skyAuthHttpOptions(REQUEST_OPTIONS));
  }

  public deleteFood(food: string): Observable<any> {
    return this.http.delete<any>(`${this.brokerUrl}api/pantry/food/${food}`, skyAuthHttpOptions(REQUEST_OPTIONS));
  }

}
