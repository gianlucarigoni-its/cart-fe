import { CurrencyPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Product } from '../../product.entity';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();
  vat = input<number>(0.22);

  price = computed(() => {
    this.product().netPrice * this.vat();
  })
}
