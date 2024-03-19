import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductFilters, ProductService } from '../../services/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ReplaySubject, Subject, startWith, switchMap } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { isNil, omitBy } from 'lodash';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {

  protected updateQueryParams$ = new ReplaySubject<ProductFilters>();

  filters$ = this.activatedRoute.queryParams;

  products$ = this.filters$
                .pipe(
                  startWith<ProductFilters>({}),
                  debounceTime(150),
                  switchMap(filters => {
                    return this.productSrv.list(filters);
                  })
                );

  protected destroyed$ = new Subject<void>();

  constructor(protected productSrv: ProductService,
              protected router: Router,
              protected activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.updateQueryParams$
      .pipe(
        takeUntil(this.destroyed$),
        map(filters => omitBy(filters, isNil)),
        map(filters => omitBy(filters, val => val === ''))
      )
      .subscribe(filters => {
        this.router.navigate([], {queryParams: filters});
      });

    this.activatedRoute.queryParams.subscribe(val => console.log(val));
  }

  ngOnDestroy(): void {
      this.destroyed$.next();
      this.destroyed$.complete();
  }

  applyFilters(value: ProductFilters) {
    this.updateQueryParams$.next(value);
  }
}
