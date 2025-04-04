import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroSortBy'
})

export class HeroSortByPipe implements PipeTransform {


  transform(value: Hero[], sortBy: keyof Hero | null): Hero[] { // keyof, algun valor de la interface Hero o null

    if( !sortBy ) return value; // si no hay valor, retorna el array original

    switch (sortBy){

      case 'name':
        return value.sort((a,b) => a.name.localeCompare(b.name));

      case 'canFly':
        return value.sort((a,b) => (a.canFly ? 1 : -1 ) - (b.canFly ? 1 : -1));

      case 'color':
        return value.sort((a,b) => a.color - b.color);

      case 'creator':
        return value.sort((a,b) => a.creator - b.creator);

      default:
      return value
    }
    return [];
  }
}
