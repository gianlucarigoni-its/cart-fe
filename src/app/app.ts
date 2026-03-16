import { Component, signal } from '@angular/core';
import { cart } from './cart-data';
import { calcCartItem } from './cart-utils';
import { CartItem } from './cart-item.entity';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [FormsModule]
})
export class App {
  items = cart;

  getItemPrice(item: CartItem): number {
    const calcItem = calcCartItem(item, 0.22);
    return calcItem.totalPrice;
  }
}
