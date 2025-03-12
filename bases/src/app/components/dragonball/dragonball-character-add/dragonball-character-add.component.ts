import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './dragonball-character-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragonballCharacterAddComponent {
  name = input.required<string>();
  power = input.required<number>();

  changes(){

  }
}
