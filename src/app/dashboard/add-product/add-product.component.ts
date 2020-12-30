import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  constructor(private productService: ApiService) {}

  ngOnInit(): void {}

  onSaveProduct(product: Product) {
    console.log(product);
    const newproduct: Product = {
      ...product,
      price: +product.price,
      quantityAvailable: +product.quantityAvailable,
    };
    this.productService.createProduct(newproduct).subscribe(
      (response) => console.log(response),
      (err) => console.log(err)
    );
  }
}
