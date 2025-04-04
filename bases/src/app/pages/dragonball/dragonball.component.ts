import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

interface Character {
  id: number;
  name: string;
  power: number;
}


@Component({
  selector: 'app-dragonball',
  imports: [
    //NgClass
   ],
  templateUrl: './dragonball.component.html',
})
export class DragonballComponent {

  name = signal('');
  power = signal<number>(0);


  characters = signal<Character[]>([  // es una señal que manerajara un arreglo de personajes
    { id: 1, name: 'Goku', power: 15001 },
    // { id: 2, name: 'Vegeta', power: 8000 },
    // { id: 3, name: 'Trunks', power: 2000 },
    // { id: 4, name: 'Gohan', power: 2500 },
    // { id: 5, name: 'Piccolo', power: 3000 },
  ]);

  // powerClasses = computed(() => {
  //   return {
  //     'text-danger' : true,
  //   }
  // })
  addCharacter() {
    if( !this.name() || !this.power() || this.power() <= 0) {
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power(),
    };

    this.characters.update((list) => [...list, newCharacter]);
    this.resetFields();

  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }

}
