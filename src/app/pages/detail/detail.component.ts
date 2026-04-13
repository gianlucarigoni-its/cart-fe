import { Component, input, computed, signal, inject, effect} from '@angular/core';
import { Product } from '../../product.entity';
import { CurrencyPipe } from '@angular/common';
import { VatSourceService } from '../../services/vat-source.service';
import { ProductSourceService } from '../../services/product-source.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { SideCartComponent } from '../../components/side-cart/side-cart.component';
import { switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CartSourceService } from '../../services/cart-source.service';


@Component({
  selector: 'app-detail',
  imports: [CurrencyPipe, SideCartComponent, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  protected vatSrv = inject(VatSourceService);
  protected ProductSrv = inject(ProductSourceService);
  protected CartSvr = inject(CartSourceService);
  id = input.required<string>();
  vat = this.vatSrv.vat;
  quantity = signal(1);

  product = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => this.ProductSrv.getProduct(id))
    )
  );

  originalPrice = computed(() => 
    (this.product()?.netPrice ?? 0) * (1 + this.vat())
  )

  finalPrice = computed(() =>
    ((this.product()?.netPrice ?? 0) * (1 - (this.product()?.discount ?? 0))) * (1 + this.vat())
  );

  addToCart(){
    this.CartSvr.addItem(this.id(), this.quantity());
  }
}
