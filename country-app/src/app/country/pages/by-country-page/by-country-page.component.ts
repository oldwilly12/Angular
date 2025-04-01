import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {

  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    request: () => ({ query: this.query() }), // que regrese un objeto por si es necesario expadinr
    loader: ({ request }) => {
      if( !request.query ) return of([]);

      return this.countryService.searchByCountry(request.query)


    }
  });
}
