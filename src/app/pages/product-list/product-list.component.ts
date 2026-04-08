import { Component, inject, signal } from '@angular/core';
import { Product } from '../../product.entity';
import { HttpClient } from '@angular/common/http';
import { ProductCardComponent } from './../product-card/product-card.component'
import { VatService } from './../../services/vat.service'

@Component({
  selector: 'app-product-list',
  imports: [ ProductCardComponent ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  private http = inject(HttpClient);
  products = signal<Product[]>([]); 
  protected vatSrv = inject(VatService);
  
  vat = this.vatSrv.vat;

  constructor(){
    this.getList();
  }

  getList(){
    this.http.get<Product[]>('api/products').subscribe(items => {
      this.products.set(items);
    })
  }
}