import { Component,OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm! : FormGroup;
  hide:boolean =true;
 email:String="";
 password:String="";

 constructor(private route:Router,private http:HttpClient) {
 }

 ngOnInit() {
   this.loginForm = new FormGroup<any>(

     {
       email : new FormControl('',[Validators.required,Validators.email]),
       password : new FormControl('',[Validators.required,Validators.minLength(6)])
     }
   )
 }

 onLogin(){

   this.email =this.loginForm.get('email')!.value;
   this.password = this.loginForm.get('password')!.value;

   console.log(this.email);
   console.log(this.password)

   let bodydata = {

     email:this.email,
     password : this.password

   }

this.http.post("http://localhost:8080/login",bodydata,{ responseType: 'text' }).subscribe((resultData:any)=>{

  // console.log(resultData);
  if (resultData.includes('Login successful.')) {
    console.log('Login successful!');
    this.route.navigateByUrl('/dashboard');
  }

});

 };
}
