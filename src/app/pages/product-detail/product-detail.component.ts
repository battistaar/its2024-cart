import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
      this.activatedRoute.params
        .subscribe(val => console.log(val));
  }
}
