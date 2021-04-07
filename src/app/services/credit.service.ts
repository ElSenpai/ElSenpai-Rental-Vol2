import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { Order } from '../models/order';
import { ResponseModel } from '../models/responses/responseModel';
import { SingleResponseModel } from '../models/responses/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  apiUrl='https://localhost:44310/api/';
  constructor(private httpClient:HttpClient) { }

  payment(card:Card):Observable<ResponseModel>{
    let newPath=this.apiUrl+"cards/add"
    return this.httpClient.post<ResponseModel>(newPath,card)
  }
 
  getCardByCustomerId(customerId:number):Observable<SingleResponseModel<Card>>{
    let newPath=this.apiUrl+"cards/getbyCustomerid?id="+customerId
    return this.httpClient.get<SingleResponseModel<Card>>(newPath);
  }
  CheckCardExist(cardnumber:string):Observable<SingleResponseModel<Card>>{
    let newPath=this.apiUrl+"cards/getcardnumber?cardNumber="+cardnumber
    return this.httpClient.get<SingleResponseModel<Card>>(newPath);
  }
}
