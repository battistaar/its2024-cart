import { Component, OnInit } from '@angular/core';
import { getVAT } from './cart-utils';
import { CartItem } from './entities/cart-item.entity';
import { CartSourceService } from './services/cart-source.service';
import { VatService } from './services/vat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  items$ = this.cartSrv.items$;

  vat$ = this.vatSrv.vat$;

  constructor(protected cartSrv: CartSourceService,
              protected vatSrv: VatService) {}

  ngOnInit(): void {
    this.vatSrv.setCountry('IT');
  }

  trackById(_: number, item: CartItem) {
    return item.id;
  }

  changeQuantity(item: CartItem, newQuantity: number) {
    this.cartSrv.setQuantity(item.id, newQuantity);
  }
}
