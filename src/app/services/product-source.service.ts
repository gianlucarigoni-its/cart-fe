import { HttpClient } from '@angular/common/http';
import { Product } from './../product.entity';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductSourceService {
    private http = inject(HttpClient);
  
    private internal = signal<Product[]>([]);
    products = this.internal.asReadonly();

    constructor(){
      this.fetch();
    }

    fetch() {
      this.http.get<Product[]>('api/products/').subscribe(items => {
        this.internal.set(items)
      })
    }

    getProduct(id: string) :Observable<Product>{
        return this.http.get<Product>(`/api/products/${id}`)
    }
}