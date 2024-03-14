import { Component } from '@angular/core';
import { CART } from './cart';
import { getVAT } from './cart-utils';
import { CartItem } from './cart-item.entity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  items = CART;

  vat = getVAT('IT');

  changeQuantity(item: CartItem, newQuantity: number) {
    item.quantity = newQuantity;
  }
}
