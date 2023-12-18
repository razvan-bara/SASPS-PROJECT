import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { Address } from '@shared/address/Address';
import { AddressService } from '../../service/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit{

  faPenAlt = faPencilAlt;
  public address$! : Address;
  showModal = false;
  isEdit = false;
  @Output() passAddress = new EventEmitter<Address>();

  constructor(
    private addressService : AddressService
    )
  {

  }
  private handleGetAddressSuccess(res : ApiResponse<Address>){
    this.address$ = res.data;
    this.passAddress.emit(this.address$);
    console.log(res);
    
  }

  private handleErrorGetAddress(err : HttpErrorResponse){
    console.log(err);
    
  }
  private fetchAddress(){
    this.addressService.getUserAddress().subscribe({
      next: res =>  this.handleGetAddressSuccess(res),
      error: err => this.handleErrorGetAddress(err)
    })
  }

  ngOnInit(): void {
    this.fetchAddress();
  }

  openEditAddressModal(){
    this.isEdit = true;
    this.showModal = true;
  }

  openNewAddressModal(){
    this.isEdit = false;
    this.showModal = true;
  }

  closeModal(){
    this.showModal = false;
  }

  submitForm(addressData : Address){
    this.address$ = addressData;
    this.passAddress.emit(this.address$);
  }
}
