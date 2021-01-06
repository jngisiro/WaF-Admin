import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  product: Product;
  loading = false;
  isUpdating = false;
  isDeleting = false;
  canEdit = false;
  confirmDelete = false;

  productName = '';
  productCategory = '';
  productDesc = '';
  productPrice = 0;
  productQty = 0;
  productImage = '';
  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.api.getProduct(params['id']).subscribe(
        (product: Product) => {
          if (product) {
            this.product = product;
            this.productName = this.product.name;
            this.productCategory = this.product.category;
            this.productDesc = this.product.description;
            this.productPrice = this.product.price;
            this.productQty = this.product.quantityAvailable;
            this.productImage = this.product.coverImage;
            this.loading = false;
          } else {
            this.loading = false;
            this.product = null;
          }
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
    });
  }

  onCanEdit() {
    this.canEdit = !this.canEdit;
  }

  onEditProduct(product) {
    this.isUpdating = true;
    let newProduct: Product = product;
    this.api.updateProduct(this.product._id, newProduct).subscribe(
      (response: Product) => {
        this.isUpdating = false;
        this.product = response;
        this.canEdit = false;
      },
      (error) => {
        this.isUpdating = false;
        console.log(error);
      }
    );
  }

  onDeleteProduct() {
    if (this.confirmDelete) {
      this.isDeleting = true;

      this.api.deleteProduct(this.product._id).subscribe(
        (response) => {
          this.isDeleting = false;
          console.log(response);
          this.product = null;
        },
        (error) => {
          this.isDeleting = false;
          console.log(error);
        }
      );
    } else {
      this.confirmDelete = true;
    }
  }

  onCreateProduct() {
    this.router.navigate(['add-product']);
  }
}
