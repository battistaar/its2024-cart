import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFiltersComponent } from './product-filters.component';

describe('ProductFiltersComponent', () => {
  let component: ProductFiltersComponent;
  let fixture: ComponentFixture<ProductFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
