import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { calcCartItem } from '../../cart-utils';
import { SideCartComponent } from '../../components/side-cart/side-cart.component';
import { CartSourceService } from '../../services/cart-source.service';
import { ProductSourceService } from '../../services/product-source.service';
import { VatSourceService } from '../../services/vat-source.service';


@Component({
  selector: 'app-detail',
  imports: [CurrencyPipe, SideCartComponent, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent {
  protected router = inject(Router)
  protected activatedRoute = inject(ActivatedRoute)
  protected CartSrv = inject(CartSourceService)
  protected VatSrv = inject(VatSourceService)
  protected ProductSrv = inject(ProductSourceService)

  vat = this.VatSrv.vat
  cart = this.CartSrv.cart
  product$ = this.activatedRoute.params
    .pipe(
      switchMap(params => this.ProductSrv.getProduct(params['id']))
    )
  product = toSignal(this.product$)

  private cartItem = computed(() => {
    const product = this.product()
    if(!product){
      return null
    }
    const tmp = { id: '', quantity: 1, product }
    return calcCartItem(tmp, this.vat());
  })

  price = computed(() => {
    const c = this.cartItem();
    return c ? c.product.netPrice*(1+this.vat()) : 0;
  })

  discountAmount = computed(() => {
    const c = this.cartItem();
    return c ? c.discountAmount : 0;
  })

  ngOnInit(){
    this.product$.subscribe(p => console.log(p))
  }

  goToProductList(){
    this.router.navigate(['/products']);
  }
}
