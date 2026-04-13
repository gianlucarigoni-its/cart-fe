import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { debounceTime, startWith, Subject, switchMap } from 'rxjs';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ProductFilterComponent, ProductFilterEvent } from '../../components/product-filter/product-filter.component';
import { SideCartComponent } from '../../components/side-cart/side-cart.component';
import { CartSourceService } from '../../services/cart-source.service';
import { ProductFilter, ProductSourceService } from '../../services/product-source.service';
import { VatSourceService } from '../../services/vat-source.service';

@Component({
  selector: 'app-product-list',
  imports: [ ProductCardComponent, SideCartComponent, AsyncPipe, ProductFilterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  protected cartSrv = inject(CartSourceService)
  protected vatSrv = inject(VatSourceService);
  protected productSvr = inject(ProductSourceService);
  protected filters$ = new Subject<ProductFilter>();

  vat = this.vatSrv.vat;

  products = this.filters$
                  .pipe(
                    startWith({}),
                    debounceTime(250),
                    switchMap(filter => this.productSvr.find(filter))
                  );

  setFilters(filters: ProductFilterEvent){
    this.filters$.next(filters);
  }

  addToCart(event: {productId: string, quantity: number}) {
    this.cartSrv.addItem(event.productId, event.quantity)
  }
}