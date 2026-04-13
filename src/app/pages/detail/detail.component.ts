import { Component, input, computed, signal, inject, effect} from '@angular/core';
import { Product } from '../../product.entity';
import { CurrencyPipe } from '@angular/common';
import { VatSourceService } from '../../services/vat-source.service';
import { ProductSourceService } from '../../services/product-source.service';

@Component({
  selector: 'app-detail',
  imports: [CurrencyPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  protected vatSrv = inject(VatSourceService);
  protected ProductSrv = inject(ProductSourceService);
  id = input.required<string>();
  product = signal<Product | undefined>(undefined);
  vat = this.vatSrv.vat;

  constructor(){
    effect(() => this.getProduct());
  }

  getProduct(){
    this.ProductSrv.getProduct(this.id()).subscribe(i => {
      this.product.set(i);
    })
  }

  getPrice(){
    return (this.product()?.netPrice ?? 0) * 100
  }
}
