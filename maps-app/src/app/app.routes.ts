import { Routes } from '@angular/router';
import { FullscreenMapPageComponent } from './pages/fullscreen-map-page/fullscreen-map-page.component';
import { MakersPageComponent } from './pages/makers-page/makers-page.component';
import { HousesPageComponent } from './pages/houses-page/houses-page.component';

export const routes: Routes = [

{
  path: 'fullscreen',
  component: FullscreenMapPageComponent,
  title: 'FullScreen Map'
},
{
  path: 'markers',
  component: MakersPageComponent,
  title: 'Marcadores'
},
{
  path: 'houses',
  component: HousesPageComponent,
  title: 'Propiedades disponibles'
},
{
  path: '**',
  redirectTo: 'fullscreen',
},
];
