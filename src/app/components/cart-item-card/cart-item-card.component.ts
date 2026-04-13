import { Component, input, computed, output} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../../cart-item.entity';
import { calcCartItem } from '../../cart-utils';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-cart-item-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.css',
})
export class CartItemCardComponent {
  item = input.required<CartItem>();
  vat = input<number>(0.22)
  toRemove = output<string>();

  calcItem = computed( () => calcCartItem(this.item(), this.vat()));  

  onRemove(){
    this.toRemove.emit(this.item().id)
  }
}
