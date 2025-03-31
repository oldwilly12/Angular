import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInputComponent {

  placeholder = input('Buscar');
  newSearch = output<string>();

  // sendValue( value: string ){
  //   this.newSearch.emit(value);
  // }
}
