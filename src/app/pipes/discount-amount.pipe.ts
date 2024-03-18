import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountAmount'
})
export class DiscountAmountPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: string | number): string {
    const tmp = this.currencyPipe.transform(value);
    return value ? `(-${tmp})` : '';
  }

}
