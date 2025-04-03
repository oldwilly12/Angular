import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';

const client1 = {
  name: 'Willy',
  geneder: 'male',
  age: 24,
  addres: "Gomez palacio, mexico"
};

const client2 = {
  name: 'Karla',
  geneder: 'female',
  age: 22,
  addres: "Torreon, mexico"
};

@Component({
  selector: 'app-uncommon-page',
  imports: [CardComponent, I18nSelectPipe, I18nPluralPipe, SlicePipe, JsonPipe, UpperCasePipe, KeyValuePipe, TitleCasePipe, AsyncPipe],
  templateUrl: './uncommon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UncommonPageComponent {

  //i18n Select
  client = signal(client1);

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }

  changeClient() {
    if(this.client() === client1) {
      this.client.set(client2)
      return;
    }

    this.client.set(client1);
  }

  // i18n Plural
  clientsMap = signal({
    '=0': 'no tenemos ningun cliente esperando', // si el valor es igual a 0
    '=1': 'hay un cliente esperando',
    '=2': 'tenemos 2 clientes esperando',
    other: 'tenemos # clientes esperando', // si queremos el numero usamos el #
  })

  clients = signal([
    'Maria',
    'Pedro',
    'Fernando',
    'Luis',
    'Ricardo',
    'Santiago',
    'Sofia',
    'Carlos',
  ]);

  deleteClient() {
    this.clients.update( prev => prev.slice(1));
  }

  // KeyValue Pipe
  profile = {
    name: 'Willy',
    age: 24,
    address: "Gomez palacio, mexico"
  }

  // Async Pipe
  promiseValue: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('Tenemos un error en la promesa');
      resolve('Tenemos data en la promesa');
      console.log('Promsea finalizada')
    }, 3500);
  });

  myObservableTimer = interval(2000).pipe(
    map( (value) => value + 1),
    tap( (value) => console.log('tap', value))
  );


}
