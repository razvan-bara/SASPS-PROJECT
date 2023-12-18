import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '@shared/order/Order';
import { OrderFilter } from '@shared/order/OrderFilter';
import { OrderForm } from '@shared/order/OrderForm';
import { ApiPaths, ApiPrefix } from 'src/environment/api-paths';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) { }

  public getOrderStatus(order : Order){
    let status : string = "";
    switch(order.status){
      case 0 : status = "Confirmata";
                break;
      case 1 : status = "Imprumutata";
                break;
      case 2 : status = "Returnata";
                break;
      case 3 : status = "Anulata";
                break;
    }
    return status;
  }

  public getLoggedInUserOrders(queryParams : OrderFilter){
    let url = `${environment.baseUrl+ApiPrefix.REQUIRE_AUTH+ApiPaths.USER_ORDERS}?page=${queryParams.page}`;
    return this.http.get<ApiResponse<Order[]>>(url)
  } 

  public getAdminOrders(queryParams : OrderFilter){
    let url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.ORDERS_FILTERED}?s=${queryParams.s}&page=${queryParams.page}`;
    return this.http.get<ApiResponse<Order[]>>(url)
  }

  public getAdminOrder(orderId : number){
    let url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.ORDERS}/${orderId}`;
    return this.http.get<ApiResponse<Order>>(url);
  }

  public updateAdminOrder(orderData : OrderForm, orderId : number){
    let url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.ORDERS}/${orderId}`;
    return this.http.put<ApiResponse<Order>>(url, orderData);
  }

  public deleteOrder(orderId : number){
    const url = `${environment.baseUrl+ApiPrefix.SECURED+ApiPaths.ORDERS}/${orderId}`;
  
    return this.http.delete<ApiResponse<Order>>(url);
  }
}
