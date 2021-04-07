import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Cardto } from 'src/app/models/dto/cardto';
import { CarService } from 'src/app/services/car.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
cardto:Cardto[]=[]
filterText="";

  constructor(private carService:CarService,private toastr:ToastrService,private aroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.aroute.params.subscribe(params=>{
      if(params["brandId"]&&params["colorId"]){
        this.getCarBrandColorId(params["brandId"],params["colorId"])
        
      }else if(params["brandId"]){
       this.getByBrandId(params["brandId"])
      }else if(params["colorId"]){
       this.getByColorId(params["colorId"])
      }else {
         this.listCars()
         
      }
    })
    
  }

  listCars(){
    this.carService.getCarDetails().subscribe(res=>{
      this.cardto=res.data
      
    })
  }
  getCarBrandColorId(brandId:number, colorId: number){
    this.carService.getCarBrandColorId(brandId,colorId).subscribe(res=>{
      this.cardto=res.data
      this.toastr.success("Listed ")
      
    })
  }

  getByColorId(colorId:number){
    this.carService.getCarDetailByColorId(colorId).subscribe(res=>{
      this.cardto=res.data
      this.toastr.success("Listed By Color")
      
    })
  }
  getByBrandId(brandId:number){
    this.carService.getCarDetailByBrandId(brandId).subscribe(res=>{
      this.cardto=res.data
      this.toastr.success("Listed By Brand")
    })
  }
  

}
