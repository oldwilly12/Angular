import { ChangeDetectionStrategy, Component, signal } from "@angular/core";




@Component({
  templateUrl: './counter.component.html',
  styles: `
  button{
    padding: 5px;
    margin: 5px 10px;
    width: 75px;
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {


  counter = 10;

  counterSignal = signal(10);

  constructor() {
    setInterval(() => {
      // this.counter += 1;
      console.log('Tick');
      this.counterSignal.update( (v) => v + 1);
    }, 2000);
  }

  increaseBy(value: number) {
    this.counter += value;
    this.counterSignal.update( (current) => current + value);
  }


  reset() {
    this.counter = 0;
    //set ignora el valor y pone el nuevo
    //update actualizar dependiendo del valor anterior
    this.counterSignal.set(0);

  }

}
