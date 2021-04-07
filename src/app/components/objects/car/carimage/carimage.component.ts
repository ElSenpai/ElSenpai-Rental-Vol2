import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Carimage } from 'src/app/models/carimage';
import { CarimageService } from 'src/app/services/carimage.service';

@Component({
  selector: 'app-carimage',
  templateUrl: './carimage.component.html',
  styleUrls: ['./carimage.component.css']
})
export class CarimageComponent implements OnInit {
carimages:Carimage[]=[]
  constructor(private carimageService:CarimageService,private activated:ActivatedRoute) { }

  ngOnInit(): void {
    this.activated.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarImageById(params["carId"])
      }
    })
  }
getCarImageById(carId:number){
  this.carimageService.getCarImagesByCarId(carId).subscribe(res=>{
    this.carimages=res.data
  })
}
}
