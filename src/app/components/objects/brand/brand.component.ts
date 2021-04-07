import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
brands:Brand[]=[]
currentBrand:Brand
  constructor(private brandService:BrandService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getBrands()
  }

  getBrands(){
    this.brandService.getBrands().subscribe(res=>{
      this.brands=res.data
    })
  }
  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
    console.log(this.currentBrand)
   }
   


}
