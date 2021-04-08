import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  brands:Brand[]=[]
  filterBrandText="";
  filterColorText="";
  colors:Color[]=[]
  currentBrand:Brand
  currentColor:Color
  constructor(private brandService:BrandService,
    private toastr:ToastrService,
    private colorService:ColorService,
    private activatedRoute:ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    
    this.getBrands()
    this.getColor()
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

  someFilter(){
    if(this.currentColor==null){      
      this.router.navigateByUrl("/main/brand/"+this.currentBrand)
    }else if(this.currentBrand==null){      
      this.router.navigateByUrl("/main/color/"+this.currentColor)
    }else {     
      this.router.navigateByUrl("/main/filter/"+this.currentBrand+"/"+this.currentColor)
      
    }
  }
  

  
 
  
}
