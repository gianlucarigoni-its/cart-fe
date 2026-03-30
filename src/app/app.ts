import { Component, computed, inject, signal } from '@angular/core';
import { cart } from './cart-data';
import { CartItem } from './cart-item.entity';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SummaryComponent } from './components/summary/summary.component';
import { getVat } from './cart-utils';
import { DEFAULT_COUNTRY_CODE } from './app.config';

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
  items = cart;
  private defaultCountryCode = inject<string>(DEFAULT_COUNTRY_CODE);
  private countryCode = signal<string>(this.defaultCountryCode);

  vat = computed(() => {
    return getVat(this.countryCode());
  });

  updateItemQuantity(item: CartItem, newQuantity: number) {
    const index = this.items.indexOf(item);
    const clone = structuredClone(this.items);
    clone[index].quantity = newQuantity;
    this.items = clone;
    // item.quantity = newQuantity;
    // this.items = structuredClone(this.items);
  }
}
