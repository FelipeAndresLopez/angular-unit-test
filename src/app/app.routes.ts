import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./components/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'pico-preview',
    loadComponent: () => import('./components/pico-preview/pico-preview.component').then(m => m.PicoPreviewComponent)
  }
];
