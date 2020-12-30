import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products;

  constructor(private router: Router, private productService: ApiService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        console.log(this.products);
      },
      (err) => console.log(err)
    );
  }

  onAllPoducts() {
    this.router.navigate(['products']);
  }

  onAllOrders() {
    this.router.navigate(['orders']);
  }
}
