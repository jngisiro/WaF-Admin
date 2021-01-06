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
  orders;
  loadingProducts = false;
  loadingOrders = false;

  constructor(private router: Router, private productService: ApiService) {}

  ngOnInit(): void {
    this.loadingOrders = true;
    this.loadingProducts = true;
    this.productService.getAllProducts().subscribe(
      (response: Product[]) => {
        this.loadingProducts = false;
        this.products = response;
      },
      (err) => {
        console.log(err);
        this.loadingProducts = false;
      }
    );

    this.productService.getOrders().subscribe(
      (orders) => {
        this.orders = orders.filter((order) => order.status === 'pending');
        this.loadingOrders = false;
      },
      (error) => {
        this.loadingOrders = false;
        console.log(error);
      }
    );
  }

  onAllPoducts() {
    this.router.navigate(['products']);
  }

  onAllOrders() {
    this.router.navigate(['orders']);
  }

  convertDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }

  onSelectOrder(order) {
    this.router.navigate(['order', order.id]);
  }

  onSelectProduct(product) {
    this.router.navigate(['product', product.id]);
  }

  createNewProduct() {
    this.router.navigate(['add-product']);
  }
}
