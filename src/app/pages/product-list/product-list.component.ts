import { Component, inject, signal } from '@angular/core';
import { Product } from '../../product.entity';
import { HttpClient } from '@angular/common/http';
import { ProductCardComponent } from '../../components/product-card/product-card.component'
import { VatService } from './../../services/vat.service'
import { CartItem } from '../../cart-item.entity';
import { calcCartItem } from '../../cart-utils';
import { CartItemCardComponent } from '../../components/cart-item-card/cart-item-card.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [ ProductCardComponent, CartItemCardComponent, CurrencyPipe ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private http = inject(HttpClient);
  products = signal<Product[]>([]); 
  protected vatSrv = inject(VatService);
  cart = signal<CartItem[]>([]);
  
  vat = this.vatSrv.vat;

  constructor(){
    this.getProductsList();
    this.getCartList();
  }

  getProductsList(){
    this.http.get<Product[]>('api/products').subscribe(items => {
      this.products.set(items);
    })
  }

  getCartList(){
    this.http.get<CartItem[]>(`api/cart-items`).subscribe(items => {
      this.cart.set(items);
    })
  }

  getTotalCartPrice(){
    return this.cart().reduce((total, item) => {
      return total + calcCartItem(item, this.vat()).totalNetPrice;
    }, 0)
  }

  addToCart(event: {productId: string, quantity: number}) {
    this.http.post('api/cart-items', {
      productId: event.productId,
      quantity: event.quantity
    }).subscribe(() => {
      this.getCartList();
    });
  }

  toRemove(event: string){
    this.http.delete(`api/cart-items/${event}`).subscribe(() => {
      this.getCartList();
    });
  }
}