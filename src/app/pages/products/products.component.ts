import { Component, OnInit } from '@angular/core';
import { ProductFilters, ProductService } from '../../services/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { startWith, switchMap } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  filters = this.fb.group({
    name: ['', {updateOn: 'change'} ],
    minPrice: [null, { updateOn: 'submit', validators: [Validators.min(0)] }],
    maxPrice: [null, { updateOn: 'submit' }]
  });

  products$ = this.filters.valueChanges
                .pipe(
                  filter(_ => this.filters.valid),
                  startWith<ProductFilters>({}),
                  debounceTime(150),
                  filter(value => {
                    return !value.name || value.name.length > 3;
                  }),
                  switchMap(filters => {
                    return this.productSrv.list(filters);
                  })
                );


  constructor(protected productSrv: ProductService,
            protected fb: FormBuilder){}

  ngOnInit(): void {
  }
}
