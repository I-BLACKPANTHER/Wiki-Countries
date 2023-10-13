import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private commonUrl = 'https://restcountries.com/v3.1/';
  private countriesUrl = 'https://restcountries.com/v3.1/all';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.countriesUrl);
    // .pipe(tap((data) => console.log('All: ' + JSON.stringify(data))));
  }

  getCountriesByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.commonUrl}name/${name}`);
  }

  getContinents(): Observable<any[]> {
    return this.http.get<any[]>(this.countriesUrl);
  }

  getContintntsByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.commonUrl}name/${name}`);
  }
}
