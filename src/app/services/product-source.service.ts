import { HttpClient } from '@angular/common/http';
import { Product } from './../product.entity';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { omitBy, isNil } from 'lodash';

export type ProductFilter = {
  name?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
}

export type ProductQuery = {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductSourceService {
    private http = inject(HttpClient);

    find(filters: ProductFilter = {}){
      const q: ProductQuery = omitBy(filters, isNil);
      return this.http.get<Product[]>('/api/products', {params: q});
    }

    getProduct(id: string) :Observable<Product>{
        return this.http.get<Product>(`/api/products/${id}`)
    }
}