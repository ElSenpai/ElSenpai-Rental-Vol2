import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Card } from 'src/app/models/card';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CreditService } from 'src/app/services/credit.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalService } from 'src/app/services/local.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css']
})
export class CreditcardComponent implements OnInit {
  creditAddForm: FormGroup
  orderAddForm: FormGroup
  carId: number
  money: number
  card: Card
  userId: number
  customerId: number
  customer: Customer
  isChecked: boolean = false;

  @Input() rent: Rental
  constructor(private activted: ActivatedRoute,
    private creditService: CreditService,
    private carService: CarService,
    private formBuilder: FormBuilder, private toastr: ToastrService, private local: LocalService,
    private customerService: CustomerService,
    private rentalService: RentalService) { }

  ngOnInit(): void {
    this.activted.params.subscribe(params => {
      if (params["carId"]) {
        this.checkPrice(params["carId"])
      }
    })
    this.decode()
    this.checkCustomer(this.userId)



    this.createCreditForm()

  }
  checkPrice(carId: number) {
    this.carService.getDtoByCarId(carId).subscribe(res => {
      this.money = res.data[0].dailyPrice

    })
  }
  createCreditForm() {
    this.creditAddForm = this.formBuilder.group({

      customerId: [""],
      cardNumber: ["" ],
      cardPassword: [""],
      money: [""]

    })

  }
  pay() {

    this.rentalService.RentAdd(this.rent).subscribe(res => {
      this.toastr.success("araç kiralandı", "Başarılı")
      this.toastr.success("ödeme gerçekleşti");
    }, resError => {
      this.toastr.error(resError.error.message, "Hata")
    })

  }
  add() {
    if (this.creditAddForm.valid) {
      let carModel = Object.assign({}, this.creditAddForm.value)
      carModel.money = this.money
      carModel.customerId = this.customerId
      
      if(this.creditAddForm.controls["cardNumber"].value == "" && this.creditAddForm.controls["cardPassword"].value=="")
      {
        
        carModel.cardNumber = this.card.cardNumber;
        carModel.cardPassword = this.card.cardPassword;
        
      }
      if (this.isChecked == true) {
        this.creditService.payment(carModel).subscribe(data => {
          this.toastr.success("Ödeme Gerçekleşti", "Başarılı")
          this.rentalService.RentAdd(this.rent).subscribe(res => {
            this.toastr.success("araç kiralandı", "Başarılı")
          }, resError => {
            this.toastr.error(resError.error.message, "Hata")
          })

        }, responseError => {
          this.toastr.error(responseError.error.message, "Doğrulama hatası")

        })
      }
      else if(this.isChecked == false){
        this.pay();
      }
    } else {
      this.toastr.error("Form eksik", "Dikkat")
    }
  }

  getCustomerCards(customerId: number) {


    this.creditService.getCardByCustomerId(customerId).subscribe(res => {
      this.card = res.data


    })
  }


  decode() {
    let token = this.local.get("token")
    let decoded = jwtDecode(token)
    let userId = Object.values(decoded)[0]
    //let email=Object.values(decoded)[1]
    //let name=Object.values(decoded)[2]
    //let claims=Object.values(decoded)[3]
    //this.claims=claims
    //this.name=name
    this.userId = userId

  }

  checkCustomer(userId: number) {
    this.customerService.getCustomerByUserId(userId).subscribe(res => {
      this.customer = res.data
      this.customerId = this.customer.id
      this.getCustomerCards(this.customerId)

    })

  }





}
