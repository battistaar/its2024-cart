import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductFilters } from '../../services/product.service';
import { Subject, filter, takeUntil } from 'rxjs';
import { assign } from 'lodash';

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.css'
})
export class ProductFiltersComponent implements OnInit, OnDestroy {
  filtersForm = this.fb.group({
    name: ['', {updateOn: 'change'} ],
    minPrice: [null, { updateOn: 'submit', validators: [Validators.min(0)] }],
    maxPrice: [null, { updateOn: 'submit' }]
  });

  @Input()
  set filters(value: ProductFilters | null) {
    const defaultValue = {
      name: '',
      minPrice: null,
      maxPrice: null
    }
    const tmp = assign(defaultValue, value);
    this.filtersForm.patchValue(tmp, {emitEvent: false});
    this.filtersForm.markAsPristine();
  }

  @Output()
  filterChange = new EventEmitter<ProductFilters>();

  protected destroyed$ = new Subject<void>();

  constructor(protected fb: FormBuilder){}

  ngOnInit(): void {
    this.filtersForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        filter(_ => this.filtersForm.valid),
        filter(value => {
          return !value.name || value.name.length > 3;
        })
      )
      .subscribe(value => {
        this.filterChange.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
