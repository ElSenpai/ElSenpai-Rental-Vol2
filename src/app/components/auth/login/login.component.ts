import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private toastrService:ToastrService,private act:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

createLoginForm(){
  this.loginForm=this.formBuilder.group({
   email:["",Validators.required],
   password:["",Validators.required]
   
  })
}
login(){
  if(this.loginForm.valid){
    let loginModel = Object.assign({},this.loginForm.value)
    this.authService.login(loginModel).subscribe(res=>{
      this.toastrService.info(res.message)
      this.toastrService.success("Giriş Başarılı")
      localStorage.setItem("token",res.data.token)
      location.reload();
     
         
    },responseError=>{
      this.toastrService.error(responseError.error.message)
    })
  }
}

}
