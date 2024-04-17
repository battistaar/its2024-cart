import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../entities/cart-item.entity';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class CartSourceService {
  protected _items$ = new BehaviorSubject<CartItem[]>([]);
  items$ = this._items$.asObservable();

  constructor(protected http: HttpClient,
              protected authSrv: AuthService
  ) {
    this.authSrv.currentUser$
      .subscribe(user => {
        if (user) {
          this.fetch();
        } else {
          this._items$.next([]);
        }
      })
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

  add(productId: string, quantity: number) {
    const data = {
      productId: productId,
      quantity
    };
    this.http.post<CartItem>(`/api/cart-items`, data)
      .subscribe(cartItem => {
        const tmp = structuredClone(this._items$.value);
        const index = this._items$.value.findIndex(item => item.id === cartItem.id);
        if (index === -1) {
          // aggiungo l'elemento se non esisteva
          tmp.push(cartItem);
        } else {
          // l'elemento esiste già
          tmp[index] = cartItem;
        }
        this._items$.next(tmp);
      })
  }

  remove(id: string) {
    this.http.delete<void>(`/api/cart-items/${id}`)
      .subscribe(() => {
        const tmp = structuredClone(this._items$.value);
        const index = this._items$.value.findIndex(item => item.id === id);
        if (index >= 0) {
          tmp.splice(index, 1);
          this._items$.next(tmp);
        }
      })
  }

}
