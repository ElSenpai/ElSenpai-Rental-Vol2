import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {
  carUpdateForm:FormGroup;
  cars:Car[]=[]
  id:number;
  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,private carService:CarService,private activated:ActivatedRoute) { }

  ngOnInit(): void {
    this.activated.params.subscribe(params=>{
     if(params["carId"]){
       this.id=params["carId"]
       
     }
    })
    this.createCarUpdateForm();
  }
  createCarUpdateForm(){
    this.carUpdateForm=this.formBuilder.group({
     id:this.id,
     brandId:["",Validators.required],
     colorId:["",Validators.required],
     modelYear:["",Validators.required],
     dailyPrice:["",Validators.required],
     carName:["",Validators.required],
     minFindeks:["",Validators.required]
    })
  }
  update() {
    if (this.carUpdateForm.valid) {
      let carModel = Object.assign({}, this.carUpdateForm.value)
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

}
