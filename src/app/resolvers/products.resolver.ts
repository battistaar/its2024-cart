import { Injectable, inject } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../entities/product.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolver implements Resolve<Product[]> {

  constructor(protected productSrv: ProductService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    const filters = route.queryParams;
    return this.productSrv.list(filters);
  }
}


// import { ResolveFn } from '@angular/router';

// export const productsResolver: ResolveFn<Product[]> = (route) => {
//   const productSrv = inject(ProductService);
//   const filters = route.queryParams;
//   return productSrv.list(filters);
// };
