import { Component, OnInit } from '@angular/core';
import jwtDecode, { JwtDecodeOptions } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 claims:string
 name:string
  constructor(private authService:AuthService,private local:LocalService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.decode()
  }
 
  authCheck(){
    return this.authService.isAuthenticated();
  
  }

  decode(){
    let token = this.local.get("token")
    let decoded=jwtDecode(token)
    //let userId=Object.values(decoded)[0]
    //let email=Object.values(decoded)[1]
    let name=Object.values(decoded)[2]
    let claims=Object.values(decoded)[3]
    this.claims=claims
    this.name=name
    
  }

  logOut(){
    this.local.remove("token")
    this.toastr.info("you Logout from Rental","Have a good day")
   
  }
  


 
  
}
