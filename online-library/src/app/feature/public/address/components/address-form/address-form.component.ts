import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from '@shared/address/Address';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from '../../service/address.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  @Input() modalInput! : boolean; 
  @Output() closeModalEvent = new EventEmitter();

  @Input() address! : Address;
  @Input() edit! : Boolean;

  addressForm! : FormGroup;
  error : string = "";
  overlay = false;
  isDataLoaded = false;

  @Output() addressFormEvent = new EventEmitter<Address>();

  constructor(
    private formBuilder: FormBuilder,
    private route : Router,
    private addressService : AddressService,
    private toastrService: ToastrService
  ){
    this.addressForm = this.formBuilder.group({
      street: ['', 
        [Validators.required, Validators.pattern("^[a-z A-Z]*$")]
      ],
      number: ['', 
        [Validators.required, Validators.pattern("^[0-9]*$")]
      ]
      });
  }


  get street(){
    return this.addressForm.get("street");
  }

  get number(){
    return this.addressForm.get("number");
  }



  get isStreetTouched(){
    return this.street?.invalid && (this.street?.dirty || this.street?.touched);
  }

  get isStreetEmpty(){
    return this.street?.errors?.['required'];
  }

  get isStreetValid(){
    return this.street?.valid;
  }

  get isStreetInvalid(){
    return this.isStreetTouched && !this.isStreetValid;
  }



  get isNumberTouched(){
    return this.number?.invalid && (this.number?.dirty || this.number?.touched);
  }

  get isNumberEmpty(){
    return this.number?.errors?.['required'];
  }

  get isNumberValid(){
    return this.number?.valid;
  }

  get isNumberInvalid(){
    return this.isNumberTouched && !this.isNumberValid;
  }

  ngOnInit(): void {
    if(this.edit){
      this.addressForm.patchValue({
        street: this.address.street,
        number: this.address.number
      })
    }
    
  }

  private handleAddAddressError(err : HttpErrorResponse){
    if(err.status == 0){
      this.toastrService.error("Conexiunea la server nu poate fi realizata");
    }else {
      this.toastrService.error(err.error.message);
    }
  }

  onSubmit(): void {
    const addressData : Address = this.addressForm.value;
    if(this.edit){
      this.addressService.updateUserAddress(addressData).subscribe({
        next : res => {
          this.toastrService.success("Adresa editata cu succes");
          this.addressFormEvent.emit(res.data);
          this.closeModal();
          this.addressFormEvent.emit(addressData);
        },
        error: err => this.handleAddAddressError(err)
      })
    } else {
      this.addressService.addUserAddress(addressData).subscribe({
        next : res => {
          this.toastrService.success("Adresa adaugata cu succes");
          this.addressFormEvent.emit(res.data);
          this.closeModal();
          this.addressFormEvent.emit(addressData);
        },
        error: err => this.handleAddAddressError(err)
      })
    }    
    
  }

  closeModal(){
    this.addressForm.reset();
    this.closeModalEvent.emit();
  }

}
