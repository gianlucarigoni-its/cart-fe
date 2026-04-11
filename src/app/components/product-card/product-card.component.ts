import { CurrencyPipe } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { Product } from '../../product.entity';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-card',
  imports: [FormsModule, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();
  vat = input<number>(0.22);
  quantity = signal(1);
  addToCart = output<{productId: string, quantity: number}>()

  price = computed(() => {
    return this.product().netPrice * this.vat();
  })

  onAdd(){
    this.addToCart.emit({productId: this.product().id, quantity: this.quantity()})
  }
}
