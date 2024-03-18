import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../cart-item.entity';
import { getDiscountAmount, getDiscountedPrice, getPrice } from '../../cart-utils';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
  @Input()
  item: CartItem | null = null;

  @Input()
  vat: number = 0;

  @Output()
  onQuantityChange = new EventEmitter<number>();

  getItemPrice(item: CartItem) {
    const discountedPrice = getDiscountedPrice(item.netPrice, item.discount);
    return getPrice(discountedPrice * item.quantity, this.vat);
  }

  getDiscountAmount(item: CartItem) {
    return getDiscountAmount(item.netPrice, item.discount) * item.quantity;
  }

  quantityChange(newQuantity: number) {
    this.onQuantityChange.emit(newQuantity);
  }
}
