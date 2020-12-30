import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products;

  constructor(private router: Router, private productService: ApiService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (response) => {
        this.products = response;
      },
      (err) => console.log(err)
    );
  }

  onAddProduct() {
    this.router.navigate(['add-product']);
  }
}
