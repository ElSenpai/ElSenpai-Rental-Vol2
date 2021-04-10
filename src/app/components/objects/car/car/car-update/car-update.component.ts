import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm:FormGroup;
  cars:Car[]=[]
  id:number;
  brands:Brand[]=[]
  colors:Color[]=[]
  currentBrand:Brand 
  currentColor:Color
  constructor(private colorService:ColorService,private brandService:BrandService, private formBuilder:FormBuilder,private toastrService:ToastrService,private carService:CarService,private activated:ActivatedRoute) { }

  ngOnInit(): void {
    this.activated.params.subscribe(params=>{
     if(params["carId"]){
       this.id=params["carId"]
       
     }
    })
    this.getBrands()
    this.getColor()
    this.createCarUpdateForm();
  }
  createCarUpdateForm(){
    this.carUpdateForm=this.formBuilder.group({
     id:this.id,
     
     modelYear:["",Validators.required],
     dailyPrice:["",Validators.required],
     carName:["",Validators.required],
     minFindeks:["",Validators.required]
    })
  }
  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value)
      carModel.brandId=this.currentBrand
      carModel.colorId=this.currentColor
      this.carService.update(carModel).subscribe(data => {
        this.toastrService.success("Araba Güncellendi", "Başarılı")
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama hatası")

          }
        }
      })
    } else {
      this.toastrService.error("Form eksik", "Dikkat")
    }

  }
  getBrands(){
    this.brandService.getBrands().subscribe(res=>{
      this.brands=res.data
    })
  }
  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
    
    
    
   }
   setCurrentColor(color:Color){
    this.currentColor=color;
 
   }

   getColor(){
    this.colorService.getColors().subscribe(res=>{
      this.colors=res.data
    })
  }

}
