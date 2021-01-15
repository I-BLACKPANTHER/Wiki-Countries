import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CountriesInterface } from './countries-interface';

@Injectable({
  providedIn: 'root'
})

export class CountriesServiceService {
  private url = 'https://restcountries.eu/rest/v2/all';
  private urlConti = `https://restcountries.eu/rest/v2/region/`;
  private nameurl = 'https://restcountries.eu/rest/v2/name/';

  constructor(private http: HttpClient) { }
  /* continent trial */
  getCountriesByContinent(continentName: string): Observable<CountriesInterface[]> {
    return this.http.get<CountriesInterface[]>(`${this.urlConti}${continentName}`);
  }
  /* Continent trial */
  getCountries(): Observable<CountriesInterface[]> {
    return this.http.get<CountriesInterface[]>(this.url).pipe(
      tap(data => console.log( /*'All: ' + JSON.stringify(data) */)),
      catchError(this.handleError)
    );

  }


  getCountry(countryName, callback: (data) => void) {
    return this.getCountries().subscribe(result => {
      let returnObj = {};
      const matchedResult = result.map(country => {
        if (country.name == countryName) {
          returnObj = country;
        }
      });
      callback(returnObj);  // execute the callback function to act on the matched result;
    },
      error => {
        console.log(error);
      }
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T)
    }
  }


}
