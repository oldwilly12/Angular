import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TopMenuComponent } from "../../components/top-menu/top-menu.component";
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";

@Component({
  selector: 'app-by-country-page',
  imports: [TopMenuComponent, CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent { }
