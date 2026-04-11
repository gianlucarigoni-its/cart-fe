import { Component, inject, input } from '@angular/core';
import { CartItem } from '../../cart-item.entity';
import { CurrencyPipe } from '@angular/common'
import { CartItemCardComponent } from '../cart-item-card/cart-item-card.component';
import { calcCartItem } from '../../cart-utils';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-side-cart',
  imports: [CartItemCardComponent, CurrencyPipe],
  templateUrl: './side-cart.component.html',
  styleUrl: './side-cart.component.css',
})
export class SideCartComponent {
  private http = inject(HttpClient)
  items = input.required<CartItem[]>()
  vat = input<number>(0.22)

  getTotalCartPrice(){
    return this.items().reduce((total, item) => {
      return total + calcCartItem(item, this.vat()).totalNetPrice;
    }, 0)
    
    //stessa cosa ma più brutta
    /*let totalPrice = 0
    for(const item of this.items()){
      totalPrice += calcCartItem(item, this.vat()).totalPrice
    }
    return totalPrice*/
  }

  toRemove(event: string){
    this.http.delete(`api/cart-items/${event}`).subscribe(() => {});
  }
}
