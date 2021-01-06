import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  loading = false;
  constructor(private productService: ApiService, private router: Router) {}

  ngOnInit(): void {}

  onSaveProduct(product: Product) {
    this.loading = true;
    const newproduct: Product = {
      ...product,
      price: +product.price,
      quantityAvailable: +product.quantityAvailable,
    };
    this.productService.createProduct(newproduct).subscribe(
      (response) => {
        this.loading = false;
        this.router.navigate(['products']);
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }
}
