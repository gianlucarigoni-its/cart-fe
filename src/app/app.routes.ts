import { Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout.component'
import { ProductListComponent } from './pages/product-list/product-list.component';
import { DetailComponent } from './pages/detail/detail.component';

export const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'detail/:id',
    component: DetailComponent
  }
];
