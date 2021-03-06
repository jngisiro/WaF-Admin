import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProfileComponent } from './profile/profile.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    HomeComponent,
    OrdersComponent,
    ProductsComponent,
    AddProductComponent,
    ProfileComponent,
    AddAdminComponent,
    OrderComponent,
    ProductComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule, FormsModule, SharedModule],
})
export class DashboardModule {}
