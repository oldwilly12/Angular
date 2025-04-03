import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, signal, inject, LOCALE_ID } from '@angular/core';
import { AvilableLocales, LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [
    LowerCasePipe,
    UpperCasePipe,
    TitleCasePipe,
    DatePipe
  ],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BasicPageComponent {

  localeService = inject(LocaleService);
  currentLocale = signal(inject(LOCALE_ID));

  nameLower = signal('willy');
  nameUpper = signal('WILLY');
  fullName = signal('wiLlY riVeRA');

  customDate = signal(new Date());


  tickingDateEffect = effect((onCleanup) => {


    const interval = setInterval(() => {
      this.customDate.set(new Date());
      console.log('tick')
    }, 1000);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  changeLocale(locale: AvilableLocales) {
    console.log(locale);
    this.localeService.changeLocale(locale);
  }
 }
