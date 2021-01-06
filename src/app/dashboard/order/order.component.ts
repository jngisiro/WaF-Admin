import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  order;
  loading = false;
  total = 0;
  onprocessOrder = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.api.getOrder(params['id']).subscribe(
        (order) => {
          this.order = order;
          this.loading = false;
          this.order.products.map((product) => {
            this.total += product.price;
          });
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
    });
  }

  convertDate(date: Date) {
    return new Date(date).toLocaleDateString();
  }

  onConfirmOrder() {
    this.onprocessOrder = true;
    this.api.processOrder(this.order.id, { status: 'confirmed' }).subscribe(
      (response) => {
        this.onprocessOrder = false;
        this.order = response;
      },
      (error) => {
        console.log(error);
        this.onprocessOrder = false;
      }
    );
  }

  onCancelOrder() {
    this.onprocessOrder = true;
    this.api.processOrder(this.order.id, { status: 'cancelled' }).subscribe(
      (response) => {
        this.order = response;
        this.onprocessOrder = false;
      },
      (error) => {
        console.log(error);
        this.onprocessOrder = false;
      }
    );
  }

  onArchiveOrder() {
    this.onprocessOrder = true;
    this.api.processOrder(this.order.id, { status: 'archived' }).subscribe(
      (response) => {
        this.order = response;
        this.onprocessOrder = false;
      },
      (error) => {
        console.log(error);
        this.onprocessOrder = false;
      }
    );
  }

  onDeleteOrder() {
    this.onprocessOrder = true;
    this.api.deleteOrder(this.order.id).subscribe(
      (response) => {
        console.log(response);
        this.order = null;
        this.onprocessOrder = false;
      },
      (error) => {
        console.log(error);
        this.onprocessOrder = false;
      }
    );
  }

  onContinue() {
    this.router.navigate(['/orders']);
  }
}
