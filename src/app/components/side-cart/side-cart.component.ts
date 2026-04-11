import { Component, input } from '@angular/core';
import { CartItem } from '../../cart-item.entity';
import { CurrencyPipe } from '@angular/common'
import { CartItemCardComponent } from '../cart-item-card/cart-item-card.component';

@Component({
  selector: 'app-side-cart',
  imports: [CartItemCardComponent, CurrencyPipe],
  templateUrl: './side-cart.component.html',
  styleUrl: './side-cart.component.css',
})
export class SideCartComponent {
  items = input.required<CartItem[]>()
  vat = input<number>(0.22)

  getTotalCartPrice(){
    let totalPrice = 0
    for(const item of this.items()){
      totalPrice += item.quantity*item.product.netPrice
    }
    return totalPrice
  }
}
