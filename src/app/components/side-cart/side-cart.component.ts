import { Component, inject } from '@angular/core';
import { CartItemCardComponent } from '../cart-item-card/cart-item-card.component';
import { CartSourceService } from '../../services/cart-source.service';
import { VatSourceService } from '../../services/vat-source.service';
import { CurrencyPipe } from '@angular/common';
import { calcCartItem } from '../../cart-utils';

@Component({
  selector: 'app-side-cart',
  imports: [CartItemCardComponent, CurrencyPipe],
  templateUrl: './side-cart.component.html',
  styleUrl: './side-cart.component.css',
})
export class SideCartComponent {
  protected cartSrv = inject(CartSourceService);
  protected vatSrv = inject(VatSourceService)

  cart = this.cartSrv.cart;
  vat = this.vatSrv.vat;

  getTotalCartPrice(){
    return this.cart().reduce((total, item) => {
      return total + calcCartItem(item, this.vat()).totalNetPrice;
    }, 0)
  }

  toRemove(event: string){
    this.cartSrv.removeItem(event)
  }
}
