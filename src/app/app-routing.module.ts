import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { UserComponent } from './components/auth/user/user.component';
import { BrandComponent } from './components/objects/brand/brand.component';
import { CarComponent } from './components/objects/car/car/car.component';
import { CardetailComponent } from './components/objects/car/cardetail/cardetail.component';
import { RentalAddComponent } from './components/objects/rental/rental-add/rental-add.component';

import { RentalComponent } from './components/objects/rental/rental/rental.component';
import { AdminComponent } from './components/tools/admin/admin.component';
import { MainComponent } from './components/tools/main/main.component';

import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {path:"",redirectTo:"main",pathMatch:"full"},
  {path:"main",component:MainComponent}, 
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"admin",component:AdminComponent,canActivate:[LoginGuard]},
  {path:"user",component:UserComponent,canActivate:[LoginGuard]},
  {path:"main/filter/:brandId/:colorId",component:CarComponent},
  {path:"main/brand/:brandId",component:CarComponent},
  {path:"main/color/:colorId",component:CarComponent},
  {path:"details/:carId",component:CardetailComponent},
  {path:"rental/:carId",component:RentalAddComponent,canActivate:[LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
