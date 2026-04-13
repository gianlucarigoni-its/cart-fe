import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { SideCartComponent } from '../../components/side-cart/side-cart.component';
import { CartSourceService } from '../../services/cart-source.service';
import { ProductSourceService } from '../../services/product-source.service';
import { VatSourceService } from '../../services/vat-source.service';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-product-list',
  imports: [ ProductCardComponent, SideCartComponent, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  protected cartSrv = inject(CartSourceService)
  protected vatSrv = inject(VatSourceService);
  protected productSvr = inject(ProductSourceService);
  
  products = this.productSvr.find() 
  cart = this.cartSrv.cart
  vat = this.vatSrv.vat;

  addToCart(event: {productId: string, quantity: number}) {
    this.cartSrv.addItem(event.productId, event.quantity)
  }
}