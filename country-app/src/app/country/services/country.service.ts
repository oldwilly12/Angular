import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries-interface';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import type { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

    private http = inject(HttpClient);
    private queryCacheCapital = new Map<string, Country[]>();
    private queryCacheCountry = new Map<string, Country[]>();
    private queryCacheRegion = new Map<Region, Country[]>();

    searchByCapital(query: string): Observable<Country[]> {
      query = query.toLowerCase();

      if( this.queryCacheCapital.has(query)){
        return of(this.queryCacheCapital.get(query)!);
      }



      return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
      .pipe(
        map(countries => CountryMapper.mapRESTCountriesToCountries(countries)),
        tap(countries => this.queryCacheCapital.set(query, countries)),
        catchError(error => {
          console.log('Error fetching ',error);

          return throwError(() => new Error(`No se encontro un pais con ese ${query}`));
        })
      );

    }


    searchByCountry(query: string) {
      query = query.toLowerCase();

      if( this.queryCacheCountry.has(query)) {
        return of( this.queryCacheCountry.get(query) ?? []); //.pipe(delay(2000)); // como es observable se puede usar el pipe
      }

      console.log(`Llegando al servidor por ${query}`);

      return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        delay(2000),
        map(countries => CountryMapper.mapRESTCountriesToCountries(countries)),
        tap(countries => this.queryCacheCountry.set(query, countries)),
        catchError(error => {
          console.log('Error fetching ',error);

          return throwError(() => new Error(`No se encontro un pais con ese ${query}`));
        })
      );
    }

    searchByCountryByAlphaCode(code: string) {

      return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map(countries => CountryMapper.mapRESTCountriesToCountries(countries)),
        map( countries => countries.at(0) ),
        catchError(error => {
          console.log('Error fetching ',error);

          return throwError(() => new Error(`No se encontro un pais con ese ${code}`));
        })
      );
    }

    searchByRegion(region: Region) {


      if( this.queryCacheRegion.has(region)) {
        return of( this.queryCacheRegion.get(region) ?? [])
      }

      return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
      .pipe(
        map(resp => CountryMapper.mapRESTCountriesToCountries(resp)),
        tap(countries => this.queryCacheRegion.set(region, countries)),
        catchError(error => {
          console.log('Error fetching ',error);

          return throwError(() => new Error(`No se encontro un pais con ese ${region}`));
        })
      );
    }
}
