import { Component, OnInit } from '@angular/core';
import { VatService } from './services/vat.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  currentUser$ = this.authSrv.currentUser$;

  constructor(
    private vatSrv: VatService,
    private authSrv: AuthService
  ) {}

  ngOnInit(): void {
      this.vatSrv.setCountry('IT');
  }

  logout() {
    this.authSrv.logout();
  }
}
