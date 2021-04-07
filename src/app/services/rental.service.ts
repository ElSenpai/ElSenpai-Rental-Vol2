import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responses/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl='https://localhost:44310/api/';
  constructor(private httpClient:HttpClient) { }

  RentAdd(rental:Rental):Observable<ResponseModel>{
    let newPath=this.apiUrl+"rentals/add"
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }
}

