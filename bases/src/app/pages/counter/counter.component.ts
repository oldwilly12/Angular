import { Component } from "@angular/core";




@Component({
  templateUrl: './counter.component.html',
  styles: `
  button{
    padding: 5px;
    margin: 5px 10px;
    width: 75px;
  }`
})
export class CounterComponent {

  counter = 10;

  increaseBy(value: number) {
    this.counter += value;
  }

  decreaseBy(value: number) {
    this.counter -= value;
  }

  reset() {
    this.counter = 10;
  }

}
