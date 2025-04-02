import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'app-country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInputComponent {

  placeholder = input('Buscar');
  newSearch = output<string>();
  debounceTime = input(500);
  initialValue = input<string>('');

  inputValue = linkedSignal<string>(() => this.initialValue());

  debounceEffect = effect((onCleanup) => {

    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.newSearch.emit(value);
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    });

  })

  // sendValue( value: string ){
  //   this.newSearch.emit(value);
  // }
}
