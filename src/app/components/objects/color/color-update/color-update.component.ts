import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastContainerModule, ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm:FormGroup;
  colors:Color[]=[];
  
  
  currentColor:Color
  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,private colorService:ColorService) { }

  ngOnInit(): void {
    this.createColorUpdateForm();
    this.getColors();
  }
  createColorUpdateForm(){
    this.colorUpdateForm=this.formBuilder.group({
      
     colorName:["",Validators.required]
    })
  }

  update() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value)
      colorModel.id=this.currentColor
      this.colorService.update(colorModel).subscribe(data => {
        this.toastrService.success("Color güncellendi", "Başarılı")
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

  getColors(){
    this.colorService.getColors().subscribe(res=>{
      this.colors=res.data;

    })
  }
  setCurrentColor(color:Color){
    this.currentColor=color;
 
   }


}