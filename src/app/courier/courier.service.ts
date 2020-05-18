import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { CourierData } from './courier-data.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrls + '/orders/';

@Injectable({ providedIn: 'root' })
export class CourierService {
  private orders: CourierData[] = [];
  private ordersUpdated = new Subject<{
    orders: CourierData[];
    orderCount: number;
  }>();

  constructor(private http: HttpClient, private router: Router) {}

  getOrders(postPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postPerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; orders: any; maxOrders: number }>(
        BACKEND_URL + queryParams
      )
      .subscribe((orderData) => {
        this.orders = orderData.orders;
        this.ordersUpdated.next({
          orders: [...this.orders],
          orderCount: orderData.maxOrders,
        });
      });
  }
  addOrder(orderData: any) {
    const finalOrderData = new FormData();
    finalOrderData.append('_id', orderData._id);
    finalOrderData.append('item_name', orderData.item_name);
    finalOrderData.append('item_weight', orderData.item_weight);
    finalOrderData.append('pickup_location', orderData.pickup_location);
    finalOrderData.append('drop_location', orderData.drop_location);
    finalOrderData.append('delivery_type', orderData.delivery_type);
    finalOrderData.append('order_date', orderData.order_date);
    finalOrderData.append('image', orderData.image, orderData.item_name);
    finalOrderData.append('order_assigner', orderData.order_assigner);
    finalOrderData.append('work_assigned', orderData.work_assigned);
    finalOrderData.append('item_status', orderData.item_status);

    this.http
      .post<{ message: string; orders: CourierData }>(
        BACKEND_URL,
        finalOrderData
      )
      .subscribe((responseData) => {
        this.router.navigate(['/orders']);
      });
  }
  deleteOrder(orderId: string) {
    return this.http.delete(BACKEND_URL + orderId);
  }
  getOrderUpdateListener() {
    return this.ordersUpdated.asObservable();
  }
}
