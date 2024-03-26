import { Component } from '@angular/core';
import { CartSourceService } from '../../services/cart-source.service';
import { VatService } from '../../services/vat.service';
import { combineLatest, map } from 'rxjs';
import { getTransportFee, parseItem } from '../../cart-utils';

@Component({
  selector: 'app-side-cart',
  templateUrl: './side-cart.component.html',
  styleUrl: './side-cart.component.css'
})
export class SideCartComponent {
  items$ = combineLatest([this.cartSrv.items$, this.vatSrv.vat$])
            .pipe(
              map(([items, vat]) => items.map(item => parseItem(item, vat)))
            );

  total$ = this.items$
            .pipe(
              map(items => {
                const totalPrice = items.reduce((total, curr) => {
                  return total + curr.price;
                }, 0);

                const totalWeight = items.reduce((total, curr) => {
                  return total + curr.weight;
                }, 0);
                const transportFee = getTransportFee(totalWeight);
                return totalPrice + transportFee;
              })
            );

  constructor(protected cartSrv: CartSourceService,
              protected vatSrv: VatService) {}

  remove(id: string) {
    this.cartSrv.remove(id);
  }
}
