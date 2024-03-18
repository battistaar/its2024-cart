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

  trackById(_: number, item: CartItem) {
    return item.id;
  }

  changeQuantity(item: CartItem, newQuantity: number) {
    const index = this.items.indexOf(item);
    const tmp = structuredClone(this.items);
    tmp[index].quantity = newQuantity;
    this.items = tmp;
  }
}
