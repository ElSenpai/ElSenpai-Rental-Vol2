import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';

import { BrandService } from 'src/app/services/brand.service';
import { DecodeService } from 'src/app/services/decode.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  constructor(private toastr:ToastrService,private decodeService:DecodeService) { }

  ngOnInit(): void {
    
    
  }

  


}
