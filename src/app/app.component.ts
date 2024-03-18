import { Component, OnInit } from '@angular/core';
import { CART } from './cart';
import { getVAT } from './cart-utils';
import { CartItem } from './cart-item.entity';
import { CartSourceService } from './services/cart-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  items$ = this.cartSrv.items$;

  vat = getVAT('IT');

  constructor(protected cartSrv: CartSourceService) {}

  trackById(_: number, item: CartItem) {
    return item.id;
  }

  changeQuantity(item: CartItem, newQuantity: number) {
    this.cartSrv.setQuantity(item.id, newQuantity);
  }
}
