
import { Component, signal } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/characterList/characterList.component";
import { DragonballCharacterAddComponent } from "../../components/dragonball/dragonball-character-add/dragonball-character-add.component";

interface Character {
  id: number;
  name: string;
  power: number;
}


@Component({
  selector: 'app-dragonballSuper',

  templateUrl: './dragonball-super.component.html',
  imports: [CharacterListComponent, DragonballCharacterAddComponent],
})
export class DragonballSuperComponent {

  name = signal('');
  power = signal<number>(0);


  characters = signal<Character[]>([  // es una señal que manerajara un arreglo de personajes
    { id: 1, name: 'Goku', power: 15001 },
    { id: 2, name: 'Vegeta', power: 8000 },
  ]);

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
