import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders;
  orderCopy;
  loading = false;
  orderType = '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.api.getOrders().subscribe(
      (orders) => {
        this.orders = orders;
        this.orderCopy = orders;
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.loading = false;
      }
    );
  }

  convertDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }

  onSelectOrder(order) {
    this.router.navigate(['order', order.id]);
  }

  filterOrders(status: string) {
    if (status !== '') {
      this.orders = this.orderCopy.filter((order) => order.status === status);
      this.orderType = status;
    } else {
      status = this.orders = this.orderCopy;
      this.orderType = '';
    }
  }
}
