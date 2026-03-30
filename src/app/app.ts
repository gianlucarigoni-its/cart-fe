import { Component, computed, OnInit, signal } from '@angular/core';
import { cart } from './cart-data';
import { CartItem } from './cart-item.entity';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SummaryComponent } from './components/summary/summary.component';
import { getVat } from './cart-utils';

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

  private countryCode = signal<string>('IT');

  vat = computed(() => {
    return getVat(this.countryCode());
  });

  updateItemQuantity(item: CartItem, newQuantity: number) {
    item.quantity = newQuantity;
    this.items = structuredClone(this.items);
  }
}
