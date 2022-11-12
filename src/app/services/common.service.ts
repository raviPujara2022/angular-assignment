import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../constants/app.constants';
import { of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient) { }

  getCountryData(): Observable<any> {
    return of(Constants.country)
  }
  getPinsData(): Observable<any> {
    return of(Constants.pins)
  }
  getCustomerData(): Observable<any> {
    return of(Constants.customer)
  }
}
