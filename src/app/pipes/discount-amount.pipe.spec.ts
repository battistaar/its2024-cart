import { DiscountAmountPipe } from './discount-amount.pipe';

describe('DiscountAmountPipe', () => {
  it('create an instance', () => {
    const pipe = new DiscountAmountPipe();
    expect(pipe).toBeTruthy();
  });
});
