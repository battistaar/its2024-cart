import { TestBed } from '@angular/core/testing';

import { CartSourceService } from './cart-source.service';

describe('CartSourceService', () => {
  let service: CartSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
