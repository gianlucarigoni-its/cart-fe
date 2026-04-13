import { HttpClient } from '@angular/common/http';
import { Product } from './../product.entity';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductSourceService {
    private http = inject(HttpClient);

    find(){
      return this.http.get<Product[]>('/api/products');
    }

    getProduct(id: string) :Observable<Product>{
        return this.http.get<Product>(`/api/products/${id}`)
    }
}