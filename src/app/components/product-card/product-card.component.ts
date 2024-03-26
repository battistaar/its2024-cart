import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../entities/product.entity';

export type ProductCartAddEvent = { productId: string, quantity: number };

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {

  @Input()
  product: Product | null = null;

  @Output()
  add = new EventEmitter<ProductCartAddEvent>();

  @Output()
  detail = new EventEmitter<string>();

  quantity: number = 1;

  onAdd() {
    if (this.quantity > 0) {
      this.add.emit({ productId: this.product!.id, quantity: this.quantity });
    }
  }

  onDetail(event: MouseEvent) {
    event.preventDefault();
    this.detail.emit(this.product!.id);
  }
}
