import { Component, inject, signal } from '@angular/core';
import { Product } from '../../product.entity';
import { HttpClient } from '@angular/common/http';
import { ProductCardComponent } from '../../components/product-card/product-card.component'
import { SideCartComponent } from '../../components/side-cart/side-cart.component';
import { VatService } from './../../services/vat.service'
import { CartItem } from '../../cart-item.entity';

@Component({
  selector: 'app-product-list',
  imports: [ ProductCardComponent, SideCartComponent ],
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
}