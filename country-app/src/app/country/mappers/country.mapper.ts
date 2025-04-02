import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries-interface';
export class CountryMapper {


  // static RestCountry => country
  static mapRESTCountrytoCountry( restCountry: RESTCountry ): Country {
    // cca2: string;
    // flag: string;
    // flagSvg: string;
    // name: string;
    // capital: string;
    // population: number;

    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No spanish name',
      capital: restCountry.capital?.join(','),
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion
    };
  }

    // static RestCountry[] => country[]
    static mapRESTCountriesToCountries( restCountries: RESTCountry[] ): Country[] {
      return restCountries.map( this.mapRESTCountrytoCountry );
    }
}
