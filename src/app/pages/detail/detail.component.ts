import { Component, input, computed, signal, inject, effect} from '@angular/core';
import { Product } from '../../product.entity';
import { HttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-detail',
  imports: [CurrencyPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  private http = inject(HttpClient)
  id = input.required<string>()
  product = signal<Product | undefined>(undefined);
  vat = input<number>(0.22);

  constructor(){
    effect(() => this.getProduct());
  }

  getProduct(){
    console.log(this.id());
    this.http.get<Product>(`/api/products/${this.id()}`).subscribe(p => {
      this.product.set(p);
    })
  }

  getPrice(){
    return (this.product()?.netPrice ?? 0) * 100
  }
}
