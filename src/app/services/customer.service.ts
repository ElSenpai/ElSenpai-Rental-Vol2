import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { SingleResponseModel } from '../models/responses/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl='https://localhost:44310/api/';
  constructor(private httpClient:HttpClient) { }
  
  getCustomerByUserId(userId:number):Observable<SingleResponseModel<Customer>>{
    let newPath=this.apiUrl+"customers/getbyid?id="+userId
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
    
  }
}
