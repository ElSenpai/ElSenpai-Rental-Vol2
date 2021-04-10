import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { DecodeService } from 'src/app/services/decode.service';
import { LocalService } from 'src/app/services/local.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 claims:string
 name:string
  constructor(private authService:AuthService,
    private local:LocalService,
    private toastr:ToastrService,
    private decodeService:DecodeService) { }

  ngOnInit(): void {
    this.decode()
  }
 
  authCheck(){
    return this.authService.isAuthenticated(); 
  }

  
  decode() {
    this.claims=this.decodeService.getClaim();
    this.name=this.decodeService.getName();
    
  }

  logOut(){
    this.local.remove("token")
    this.toastr.info("you Logout from Rental","Have a good day")   
  }
  


 
  
}
