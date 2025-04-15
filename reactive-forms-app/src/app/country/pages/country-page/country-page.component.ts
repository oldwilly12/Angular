import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {

  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal( this.countryService.regions );

  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });


  onFormChanged = effect(( onCleanup ) => {
    const regionSubscription = this.onRegionChanged()

    onCleanup(() => {
      regionSubscription.unsubscribe();
    })
  })

  // los effectos se ejecutan tan protno el componente es montado
  onRegionChanged() {

    return this.myForm.get('region')!.valueChanges
    .pipe()
    .subscribe( region => {
      console.log({region});
    })

  }


 }
