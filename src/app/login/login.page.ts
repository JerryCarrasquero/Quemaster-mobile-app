import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms'
import {LoginService} from '../services/login.service'
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private loginForm: FormGroup;
  private error: String;
  disabled:any;
  constructor(private loading:LoadingController,private storage: Storage,public fb: FormBuilder,public LoginService:LoginService,private router:Router) { 

    this.loginForm =this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });

    this.error=null;
    this.disabled=false;
  }

  register(){
    console.log("i was clicked r");
    this.router.navigate(["register"]);
  }

  login(){
    console.log("login in");
    let data=this.loginForm.value;
    console.log(this.loginForm.value);
    this.LoginService.login(data).subscribe(results=>{
      console.log(results);
      if (results.status==202){
        
        this.storage.set("token",results.token);
        this.router.navigate(["home"]);    
      }else {
        this.error=results.response;
      }
    })
  }
  
  ngOnInit() {
  }

}
