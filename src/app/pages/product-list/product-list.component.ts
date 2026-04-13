import { Component, inject, signal } from '@angular/core';
import { Product } from '../../product.entity';
import { HttpClient } from '@angular/common/http';
import { ProductCardComponent } from '../../components/product-card/product-card.component'
import { VatService } from './../../services/vat.service'
import { CartItem } from '../../cart-item.entity';
import { calcCartItem } from '../../cart-utils';
import { CartItemCardComponent } from '../../components/cart-item-card/cart-item-card.component';
import { CurrencyPipe } from '@angular/common';
import { CartSourceService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-product-list',
  imports: [ ProductCardComponent, CartItemCardComponent, CurrencyPipe ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  protected http = inject(HttpClient)
  protected cartSrv = inject(CartSourceService)
  protected vatSrv = inject(VatService);
  protected productSvr = inject(ProductService);
  products = this.productSvr.products 
  cart = this.cartSrv.cart
  
  vat = this.vatSrv.vat;

  getTotalCartPrice(){
    return this.cart().reduce((total, item) => {
      return total + calcCartItem(item, this.vat()).totalNetPrice;
    }, 0)
  }

  addToCart(event: {productId: string, quantity: number}) {
    this.cartSrv.addItem(event.productId, event.quantity)
  }

  toRemove(event: string){
    this.cartSrv.removeItem(event)
  }
}