import { Component, Input } from '@angular/core';
import { CartItem } from '../../cart-item.entity';
import { getTransportFee, parseItem } from '../../cart-utils';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
  @Input()
  items: CartItem[] = [];

  @Input()
  vat: number = 0;

  protected calculateItems() {
    return this.items.map(item => parseItem(item, this.vat));
  }

  getNetTotal() {
    const calculatedItems = this.calculateItems();

    return calculatedItems.reduce((total, item) => {
        return total + item.discountedPrice;
      }, 0);
  }

  getVatTotal() {
    const calculatedItems = this.calculateItems();
    return calculatedItems.reduce((total, item) => {
        return total + item.vatAmount;
      }, 0);
  }

  getTransportFee() {
    const calculatedItems = this.calculateItems();
    const weight = calculatedItems.reduce((total, item) => {
        return total + item.weight;
      }, 0);

    return getTransportFee(weight);
  }

  getTotal() {
    const calculatedItems = this.calculateItems();
    const total = calculatedItems.reduce((total, item) => {
        return total + item.price;
      }, 0);

    return total + this.getTransportFee();
  }
}
