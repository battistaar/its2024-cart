import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CartItem } from '../../cart-item.entity';
import { getTransportFee, parseItem } from '../../cart-utils';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SummaryComponent implements OnChanges {
  protected _items: CartItem[] = [];

  @Input()
  set items(value: CartItem[] | null) {
    this._items = value ? value : [];
  }

  protected _vat: number = 0;
  @Input()
  set vat(value: number | null) {
    this._vat = value !== null ? value : 0;
  };

  summary = this.updateSummary();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] || changes['vat']) {
      this.summary = this.updateSummary();
    }
  }

  private updateSummary() {
    const tmpSummary = this._items.reduce((summ, curr) => {
      const calculated = parseItem(curr, this._vat);
      return {
        netTotal: summ.netTotal + calculated.discountedPrice,
        vatTotal: summ.vatTotal + calculated.vatAmount,
        totalWeight: summ.totalWeight + calculated.weight,
        total: summ.total + calculated.price
      }
    }, {
      netTotal: 0,
      vatTotal: 0,
      totalWeight: 0,
      total: 0
    });
    const transport = getTransportFee(tmpSummary.totalWeight)
    tmpSummary.total += transport;
    return {...tmpSummary, transport};
  }
}
