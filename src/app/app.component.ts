import { Component, OnInit } from '@angular/core';
import { VatService } from './services/vat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor(private vatSrv: VatService) {}

  ngOnInit(): void {
      this.vatSrv.setCountry('IT');
  }
}
