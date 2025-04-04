import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'canFly'
})

export class CanFlyPipe implements PipeTransform {
  transform( value: boolean ): string {

    if ( value ){
      return "Puede volar";
    } else {
      return "No puede volar";
    }
  }
}
