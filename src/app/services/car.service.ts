import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { Cardto } from '../models/dto/cardto';
import { ListResponseModel } from '../models/responses/listResponseModel';
import { ResponseModel } from '../models/responses/responseModel';




@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl='https://localhost:44310/api/';
  
  constructor(private httpClient:HttpClient) { }
  
  getCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl+"cars/getall"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarDetails():Observable<ListResponseModel<Cardto>>{
    let newPath=this.apiUrl+"cars/getdetail"
    return this.httpClient.get<ListResponseModel<Cardto>>(newPath);
  }
  add(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
  }
  update(car:Car):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car)
  }
  getCarBrandColorId(brandId:number,colorId:number):Observable<ListResponseModel<Cardto>>{
    let newPath=this.apiUrl+"cars/getbrandcolorid?brandId="+brandId+"&colorId="+colorId
    return this.httpClient.get<ListResponseModel<Cardto>>(newPath);
    
  }

  getCarDetailByBrandId(brandId:number):Observable<ListResponseModel<Cardto>>{
    let newPath=this.apiUrl+"cars/getdetailbrandid?brandId="+brandId
    return this.httpClient.get<ListResponseModel<Cardto>>(newPath);
  }
  getCarDetailByColorId(colorId:number):Observable<ListResponseModel<Cardto>>{
    let newPath=this.apiUrl+"cars/getdetailcolorid?colorId="+colorId
    return this.httpClient.get<ListResponseModel<Cardto>>(newPath);
  }

  getDtoByCarId(carId:number):Observable<ListResponseModel<Cardto>>{
    let newPath=this.apiUrl+"cars/getcardtobyid?carId="+carId
    return this.httpClient.get<ListResponseModel<Cardto>>(newPath);
  }
}