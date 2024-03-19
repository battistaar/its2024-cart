import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../entities/product.entity';
import { isNil, omitBy } from 'lodash';

export interface ProductFilters {
  name?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(protected http: HttpClient) { }

  list(filters: ProductFilters) {
    const q = omitBy(filters, isNil);
    return this.http.get<Product[]>('/api/products', { params: q });
  }
}
