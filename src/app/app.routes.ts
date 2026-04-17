import { Routes } from '@angular/router';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductContainerComponent } from './pages/product-container/product-container.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'products',
    component: ProductContainerComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailComponent
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  }
];
