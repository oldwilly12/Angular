
import { Component, inject } from '@angular/core';
import { CharacterListComponent } from "../../components/dragonball/characterList/characterList.component";
import { DragonballCharacterAddComponent } from "../../components/dragonball/dragonball-character-add/dragonball-character-add.component";
import { DragonballService } from '../../services/dragonball.service';
import { Character } from '../../interfaces/character.interface';




@Component({
  selector: 'app-dragonballSuper',

  templateUrl: './dragonball-super.component.html',
  imports: [
    CharacterListComponent,
    DragonballCharacterAddComponent
  ],
})
export class DragonballSuperComponent {

  // constructor(
  //   private dragonballService: DragonballService
  // ){}

  public dragonballService = inject(DragonballService);

}
