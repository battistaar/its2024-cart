import { Injectable } from '@angular/core';
import { CART } from '../cart';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../entities/cart-item.entity';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CartSourceService {
  protected _items$ = new BehaviorSubject<CartItem[]>([]);
  items$ = this._items$.asObservable();

  constructor(protected http: HttpClient) {
    this.fetch();
  }

  setQuantity(id: string, quantity: number) {
    this.http.patch<CartItem>(`/api/cart-items/${id}`, { quantity })
      .subscribe(updated => {
        const index = this._items$.value.findIndex(item => item.id === id);
        const tmp = structuredClone(this._items$.value);
        tmp[index] = updated;
        this._items$.next(tmp);
      })
  }

  fetch() {
    this.http.get<CartItem[]>('/api/cart-items')
      .subscribe(items => {
        this._items$.next(items);
      });
  }

}
