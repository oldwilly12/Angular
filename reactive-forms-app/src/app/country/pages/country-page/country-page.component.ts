import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

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
    // me trae un subscription
    const regionSubscription = this.onRegionChanged()
    const countrySubscription = this.onCountryChanged();

    onCleanup(() => {
      regionSubscription.unsubscribe();
      countrySubscription.unsubscribe();
    })
  })

  // los effectos se ejecutan tan protno el componente es montado
  onRegionChanged() {

    return this.myForm.get('region')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('country')!.setValue('')),
      tap(() => this.myForm.get('border')!.setValue('')),
      tap(() => {
        this.borders.set([]);
        this.countriesByRegion.set([]);
      }),
      switchMap( region => this.countryService.getCountriesByRegion(region ?? ''))
    )
    .subscribe( country => {
      // console.log({country});
      this.countriesByRegion.set(country);
    });

  }

  onCountryChanged() {
    return this.myForm.get('country')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('border')!.setValue('')),
      filter( value => value!.length > 0), // la idea del filter es que me proteja de si alguien tiene un valor vacio no continue
      switchMap( alphaCode => this.countryService.getCountryByAlphaCode(alphaCode ?? '')),
      switchMap( country => this.countryService.getCountryNamesByCodeArray(country.borders ?? []))
    )
    // el swrichmap regresa el country seleccionado o obtenido por el alphaCode
    .subscribe( borders => {
      this.borders.set(borders);
    })
  }


 }


 /**
  *el switchmap permite transforamr el observable en otro observable diferente

  el filter me servira para filtrar valores
  *   */
