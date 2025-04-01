import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries-interface';
import { map, Observable, catchError, throwError, delay } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import type { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

    private http = inject(HttpClient);

    searchByCapital(query: string): Observable<Country[]> {
      query = query.toLowerCase();

      return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(countries => CountryMapper.mapRESTCountriesToCountries(countries)),
        catchError(error => {
          console.log('Error fetching ',error);

          return throwError(() => new Error(`No se encontro un pais con ese ${query}`));
        })
      );

    }


    searchByCountry(query: string) {
      query = query.toLowerCase();

      return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        delay(2000),
        map(countries => CountryMapper.mapRESTCountriesToCountries(countries)),
        catchError(error => {
          console.log('Error fetching ',error);

          return throwError(() => new Error(`No se encontro un pais con ese ${query}`));
        })
      );
    }

    searchByCountryByAlphaCode(code: string) {

      return this.http.get<RESTCountry[]>(`${API_URL}/name/${code}`)
      .pipe(
        map(countries => CountryMapper.mapRESTCountriesToCountries(countries)),
        map( countries => countries.at(0) ),
        catchError(error => {
          console.log('Error fetching ',error);

          return throwError(() => new Error(`No se encontro un pais con ese ${code}`));
        })
      );
    }
}
