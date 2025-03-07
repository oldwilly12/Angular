import { UpperCasePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';


@Component({
  templateUrl: './hero-page.component.html',
  imports: [ UpperCasePipe ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroPageComponent {

  name = signal('ironman');
  age = signal(45);

  heroDescription = computed(() => {
    const descrption = `${ this.name() } - ${ this.age() }`;
    return descrption;
  })

 capitalizeName = computed(() => {
  return this.name().toUpperCase();
 })

  changeAge(): void {
    this.age.set(60);
  }

  resetForm(): void {
    this.name.set('Ironman');
    this.age.set(45);
  }

  changeHero(): void {
    this.name.set('Spiderman');
    this.age.set(22);
  }
}
