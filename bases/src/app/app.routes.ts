import { Routes } from '@angular/router';
import { CounterComponent } from './pages/counter/counter.component';
import { HeroPageComponent } from './pages/hero/hero-page.component';
import { DragonballComponent } from './pages/dragonball/dragonball.component';

export const routes: Routes = [

{
  path: '',
  component: CounterComponent
},
{
  path: 'hero',
  component: HeroPageComponent
},
{
  path: 'dragonball',
  component: DragonballComponent
},
{
  path: '**', // cualquier path que no este incluido en las rutas anteriores
  redirectTo: '' // redirige a la ruta principal
}

];
