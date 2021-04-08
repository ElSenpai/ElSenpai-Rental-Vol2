import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ToastrModule} from 'ngx-toastr';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UserComponent } from './components/auth/user/user.component';
import { CardetailComponent } from './components/objects/car/cardetail/cardetail.component';
import { CarComponent } from './components/objects/car/car/car.component';
import { RentaldetailComponent } from './components/objects/rental/rentaldetail/rentaldetail.component';
import { RentalComponent } from './components/objects/rental/rental/rental.component';
import { CarimageComponent } from './components/objects/car/carimage/carimage.component';
import { ColorComponent } from './components/objects/color/color.component';
import { BrandComponent } from './components/objects/brand/brand.component';
import { CustomerComponent } from './components/objects/customer/customer.component';
import { NavbarComponent } from './components/tools/navbar/navbar.component';
import { MainComponent } from './components/tools/main/main.component';
import { SidebarComponent } from './components/tools/sidebar/sidebar.component';
import { CarAddComponent } from './components/objects/car/car/car-add/car-add.component';
import { CarUpdateComponent } from './components/objects/car/car/car-update/car-update.component';
import { BrandAddComponent } from './components/objects/brand/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/objects/brand/brand-update/brand-update.component';
import { ColorAddComponent } from './components/objects/color/color-add/color-add.component';
import { ColorUpdateComponent } from './components/objects/color/color-update/color-update.component';

import { CreditcardComponent } from './components/payments/creditcard/creditcard.component';
import { AdminComponent } from './components/tools/admin/admin.component';
import { FilterCarPipe } from './pipes/filter-car.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { RentalAddComponent } from './components/objects/rental/rental-add/rental-add.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    CardetailComponent,
    CarComponent,
    RentaldetailComponent,
    RentalComponent,
    CarimageComponent,
    ColorComponent,
    BrandComponent,
    CustomerComponent,
    NavbarComponent,
    MainComponent,
    SidebarComponent,
    CarAddComponent,
    CarUpdateComponent,
    BrandAddComponent,
    BrandUpdateComponent,
    ColorAddComponent,
    ColorUpdateComponent,
    
    CreditcardComponent,
    AdminComponent,
    FilterCarPipe,
    FilterColorPipe,
    FilterBrandPipe,
    RentalAddComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [ {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
