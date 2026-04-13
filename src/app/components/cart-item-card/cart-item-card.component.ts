import { Component, input, computed, output, inject} from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../../cart-item.entity';
import { calcCartItem, getVat, getVatPrice } from '../../cart-utils';
import { RouterLink } from "@angular/router";
import { VatSourceService } from '../../services/vat-source.service';

@Component({
  selector: 'app-cart-item-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart-item-card.component.html',
  styleUrl: './cart-item-card.component.css',
})
export class CartItemCardComponent {
  protected vatSvr = inject(VatSourceService)
  
  item = input.required<CartItem>();
  vat = this.vatSvr.vat;
  toRemove = output<string>();

  calcItem = computed( () => calcCartItem(this.item(), this.vat()));  

  onRemove(){
    this.toRemove.emit(this.item().id)
  }
}
