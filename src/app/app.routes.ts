import { Routes } from '@angular/router';
import { PersonComponent } from './components/person/person.component';
import { PeopleComponent } from './components/people/people.component';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'pico-preview',
    loadComponent: () => import('./components/pico-preview/pico-preview.component').then(m => m.PicoPreviewComponent)
  },
  {
    path: 'people',
    component: PeopleComponent
  }
];
