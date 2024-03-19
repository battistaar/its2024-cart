import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VatService {
  private _vat$ = new BehaviorSubject<number>(0);
  vat$ = this._vat$.asObservable();

  setCountry(code: string) {
    const vat = code === 'IT' ? 0.22 : 0;
    this._vat$.next(vat);
  }

}
