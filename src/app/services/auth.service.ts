import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClaimsModel } from '../models/claimsModel';
import { LoginModel } from '../models/dto/loginModel';
import { RegisterModel } from '../models/dto/registerModel';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { ResponseModel } from '../models/responses/responseModel';
import { SingleResponseModel } from '../models/responses/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 apiUrl="https://localhost:44310/api/"
  constructor(private httpClient:HttpClient) { }
  login(loginModel:LoginModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"auth/login",loginModel)
  }
  register(registerModel:RegisterModel){
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"auth/register",registerModel)
  }
  getClaims(user:User){
    return this.httpClient.get<ListResponseModel<ClaimsModel>>(this.apiUrl+"operations/getall")
  }
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
    
  }
  checkClaims(){
    if(localStorage.getItem("claim")){
      return true;
    }else{
      return false;
    }
    
  }
  
}
