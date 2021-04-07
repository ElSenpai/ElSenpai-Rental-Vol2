import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userUpdateForm:FormGroup
  password:string
  userId:number
  constructor(private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private userService:UserService,
    private local:LocalService,
    private auth:AuthService) { }

  ngOnInit(): void {
    this.decode()
    this.createUpdateForm()
  }

  createUpdateForm(){
    this.userUpdateForm=this.formBuilder.group({
      id:this.userId,
      firstName:[null],
      lastName:[null],
      email:[null],
      password:[null]
    })
  }

  update(){
    if(this.userUpdateForm.valid){
      
      let updateModel= Object.assign({},this.userUpdateForm.value)
      
      this.userService.update(updateModel,String(updateModel.password)).subscribe(res=>{
        this.toastr.success("Bilgiler Güncellendi","Success")
        localStorage.removeItem("token")       
        location.reload();        
      },errorRes=>{
        this.toastr.error(errorRes,"başarısız")
      })
    }
  }
  decode() {
    let token = this.local.get("token")
    let decoded = jwtDecode(token)
    let userId = Object.values(decoded)[0]
    //let email=Object.values(decoded)[1]
    //let name=Object.values(decoded)[2]
    //let claims=Object.values(decoded)[3]
    //this.claims=claims
    //this.name=name
    this.userId = userId

  }
}
