import { Injectable, signal } from '@angular/core';

export type AvilableLocales = 'es' | 'fr' | 'en';

@Injectable({providedIn: 'root'})
export class LocaleService {

  private currentLocale = signal<AvilableLocales>('fr');

  constructor() {
    this.currentLocale.set(
      localStorage.getItem('locale') as AvilableLocales ?? 'es'
    );
  }

  get getLocale() {
    return this.currentLocale()
  }

  changeLocale(locale: AvilableLocales) {
    localStorage.setItem('locale', locale);
    this.currentLocale.set(locale);
    window.location.reload(); // recargar pantalla
  }
}
