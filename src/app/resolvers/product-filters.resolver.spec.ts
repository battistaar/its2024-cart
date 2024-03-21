import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { productFiltersResolver } from './product-filters.resolver';

describe('productFiltersResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => productFiltersResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
