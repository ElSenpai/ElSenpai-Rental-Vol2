import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Cardto } from 'src/app/models/dto/cardto';
import { CarService } from 'src/app/services/car.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
  cardto:Cardto
  claims:string
  constructor(private activated:ActivatedRoute, private carService:CarService,private local:LocalService) { }

  ngOnInit(): void {
    this.activated.params.subscribe(params=>{
      if(params["carId"]){
        this.getByCarId(params["carId"])
      }
    })
    this.decode();
  }
  getByCarId(carId:number){
    this.carService.getDtoByCarId(carId).subscribe(res=>{
      this.cardto=res.data[0]
    })
  }
  decode(){
    let token = this.local.get("token")
    let decoded=jwtDecode(token)
    let claims=Object.values(decoded)[3]
    this.claims=claims
  }
}
