import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { DecodeService } from 'src/app/services/decode.service';
import { LocalService } from 'src/app/services/local.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css']
})
export class RentalAddComponent implements OnInit {
  rentalAddForm:FormGroup
  isCheck:boolean=false;
  carId:number
  userId:number
  customerId:number
  customer:Customer
  rental:Rental


  constructor(private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private rentalService:RentalService,
    private customerService:CustomerService,
    
    private activated:ActivatedRoute,
    private decodeService:DecodeService) { }

  ngOnInit(): void {
    this.activated.params.subscribe(params=>{
      if(params["carId"]){
        this.carId=params["carId"]
      }
    })
         
    this.decode()
    this.checkCustomer(this.userId) 
    this.createRentalAddForm()
  }
decode(){
  this.userId=this.decodeService.getUserId();
   
    
  }

  checkCustomer(userId:number){
    this.customerService.getCustomerByUserId(userId).subscribe(res=>{
      this.customer=res.data   
      this.customerId=res.data.id
      
                      
    })
    
  }

  createRentalAddForm(){
    this.rentalAddForm=this.formBuilder.group({
     carId:this.carId,
     customerId:[""],     
     rentDate:["",Validators.required],
     returnDate:["",Validators.required]  
      
    })
   
  }

  add() {
    if (this.rentalAddForm.valid) {
      let customerId = this.customerId;
      let rent: Rental = {
        carId: this.carId,
        customerId:customerId,
        rentDate:this.rentalAddForm.controls['rentDate'].value,
        returnDate:this.rentalAddForm.controls['returnDate'].value
        
      };
      this.rental = rent;
      this.isCheck=true;
      this.toastrService.success(
        'Kiralama sıraya alındı'
      );
    }
    else{
      this.toastrService.error(
        'Form eksik', 'Error'
      );
    }
  }

 


}
