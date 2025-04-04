import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleCase' //  'willy' | toggleCase
})

export class ToggleCasePipe implements PipeTransform {
  transform(value: string, upper: boolean = true ): string { // se dispara cada que cambia el valor

    return upper ? value.toUpperCase() : value.toLowerCase();
  }
}
