import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [NavigationComponent, LoadingComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavigationComponent, LoadingComponent],
})
export class SharedModule {}
