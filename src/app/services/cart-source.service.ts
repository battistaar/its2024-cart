import { Injectable } from '@angular/core';
import { CART } from '../cart';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../entities/cart-item.entity';

@Injectable()
export class CartSourceService {
  protected _items$ = new BehaviorSubject<CartItem[]>([...CART]);
  items$ = this._items$.asObservable();

  setQuantity(id: string, quantity: number) {
    const index = this._items$.value.findIndex(item => item.id === id);
    const tmp = structuredClone(this._items$.value);
    tmp[index].quantity = quantity;
    this._items$.next(tmp);
  }

}
