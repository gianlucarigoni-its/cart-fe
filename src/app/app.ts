import { Component, computed, inject, signal } from '@angular/core';
import { CartItem } from './cart-item.entity';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SummaryComponent } from './components/summary/summary.component';
import { getVat } from './cart-utils';

import { CartSourceService } from './services/cart-source.service';
import { VatSourceService } from './services/vat-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    FormsModule,
    CartItemComponent,
    SummaryComponent
  ]
})
export class App {
  protected cartSrv = inject(CartSourceService);
  protected vatSvr = inject(VatSourceService);

  items = this.cartSrv.cart;
  countryCode = this.vatSvr.countryCode;
  
  vat = computed(() => {
    return getVat(this.countryCode());
  })

  updateItemQuantity(item: CartItem, newQuantity: number) {
    this.cartSrv.setQuantity(item, newQuantity);
  }
}
