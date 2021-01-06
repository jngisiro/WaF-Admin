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
  loading = false;

  constructor(private router: Router, private productService: ApiService) {}

  ngOnInit(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe(
      (response) => {
        this.loading = false;
        this.products = response;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  onAddProduct() {
    this.router.navigate(['add-product']);
  }

  onSelectProduct(product) {
    this.router.navigate(['product', product.id]);
  }
}
