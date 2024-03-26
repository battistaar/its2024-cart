import { Component } from '@angular/core';
import { CartSourceService } from '../../services/cart-source.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrl: './product-container.component.css'
})
export class ProductContainerComponent {
  hasItems$ = this.cartSrv.items$
                .pipe(
                  map(items => !!items.length)
                )

  constructor(private cartSrv: CartSourceService) {}
}
