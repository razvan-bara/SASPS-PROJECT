import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '@shared/address/Address';
import { ApiPaths, ApiPrefix } from 'src/environment/api-paths';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http : HttpClient) { }

  public getUserAddress(){
    let url = `${environment.baseUrl+ApiPrefix.REQUIRE_AUTH+ApiPaths.USER_ADDRESS}`;
    return this.http.get<ApiResponse<Address>>(url);
  }

  public addUserAddress(addressData : Address){
    let url = `${environment.baseUrl+ApiPrefix.REQUIRE_AUTH+ApiPaths.USER_ADDRESS}`;
    return this.http.post<ApiResponse<Address>>(url, addressData);
  }

  public updateUserAddress(addressData : Address){
    let url = `${environment.baseUrl+ApiPrefix.REQUIRE_AUTH+ApiPaths.USER_ADDRESS}`;
    return this.http.put<ApiResponse<Address>>(url, addressData);
  }
}
