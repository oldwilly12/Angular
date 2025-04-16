import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountryService {

  private baseUrl = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  private _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  get regions(): string[] {
    return [...this._regions];
  }

  getCountriesByRegion( region: string ): Observable<Country[]>{
    if (!region) return of([]);

    console.log({region});

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url);
  }

  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  getCountryNamesByCodeArray( countryCodes: string[]): Observable<Country[]> {
    if ( !countryCodes || countryCodes.length === 0) return of([]);

    const countriesRequests: Observable<Country>[] = []; //es un arreglo de observables que emiten el pais

    countryCodes.forEach( code => {
      const request = this.getCountryByAlphaCode(code);
      countriesRequests.push(request);
    })

    return combineLatest(countriesRequests);
  }

}


/**
 * en app.congig.ts
 * en providers:[
 *  provideHttpClient( withFetch() ) // <-- add this line
 * ]
 *
 *
 * combineLatest, nos permite pasar un arreglo de subscriciones y trabajar con ellas y esperar que todas se emitan y tener los valores
 * cuando se cumplan con extio. el combineLatest recibe un arreglo de observables
 */
