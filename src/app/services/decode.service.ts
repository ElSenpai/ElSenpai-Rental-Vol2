import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class DecodeService {



  constructor(private local:LocalService) { }

 getUserId() {
   let token =this.local.get("token")
    let decoded=jwtDecode(token)
     let userId= Object.values(decoded)[0]     
     return userId;
   }
   getName(){
    let token =this.local.get("token")
    let decoded=jwtDecode(token)
    let name=Object.values(decoded)[2]
    return name;
   }
 getClaim(){
  let token =this.local.get("token")
  let decoded=jwtDecode(token)
     let claims=Object.values(decoded)[3]
    return claims;
   }
   getEmail(){
    let token =this.local.get("token")
    let decoded=jwtDecode(token)
    let email=Object.values(decoded)[1]
     return email;
   }
  
}
