import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responses/responseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl='https://localhost:44310/api/';
  constructor(private httpClient:HttpClient) { }

 update(user:User,password:string):Observable<ResponseModel>{
    let newPath=this.apiUrl+"users/update?password="+password
    return this.httpClient.post<ResponseModel>(newPath,user);
  }
}
