import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

import { CourierService } from './../courier.service';
import { CourierData } from './../courier-data.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  templateUrl: './courier-list.component.html',
  styleUrls: ['./courier-list.component.css'],
})
export class CourierListComponent implements OnInit, OnDestroy {
  orders: CourierData[] = [];
  userIsAuthenticated = false;
  isLoading = false;
  totalOrders = 0;
  orderPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userId: string;
  private ordersSub: Subscription;
  private authStatusSub: Subscription;
  constructor(
    public courierService: CourierService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.isLoading = true;
    this.userId = this.authService.getUserId();
    this.courierService.getOrders(this.orderPerPage, this.currentPage);
    this.ordersSub = this.courierService
      .getOrderUpdateListener()
      .subscribe((orderData: { orders: CourierData[]; orderCount: number }) => {
        this.isLoading = false;
        this.totalOrders = orderData.orderCount;
        this.orders = orderData.orders;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onDelete(orderId: string) {
    this.isLoading = true;
    this.courierService.deleteOrder(orderId).subscribe(
      () => {
        this.courierService.getOrders(this.orderPerPage, this.currentPage);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  onPageChange(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.orderPerPage = pageData.pageSize;
    this.courierService.getOrders(this.orderPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.ordersSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
