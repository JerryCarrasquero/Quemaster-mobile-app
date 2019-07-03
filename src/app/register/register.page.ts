import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder, FormGroup} from '@angular/forms'
import { LoginPage  } from '../login/login.page';
import {Utilities} from '../utilities';
import {LoginService} from '../services/login.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private RegisterForm: FormGroup;
  public error:String;
  constructor(private router:Router,private fb: FormBuilder,private LoginService:LoginService) { 
    this.RegisterForm =this.fb.group({
      username: ['',Validators.compose([Validators.pattern('^[A-Za-z0-9_-]{4,15}$'), Validators.required])],
      password: ['',Validators.compose([Validators.pattern('^[A-Za-z0-9]{8,15}$'), Validators.required])],
      repassword: ['',Validators.compose([Validators.pattern('^[A-Za-z0-9]{8,15}$'), Validators.required])],
      email: ['',Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      name: ['',Validators.required]
    }, {
    validator: Utilities.MatchPassword // your validation method
    });
  }

  register(){
    let data = this.RegisterForm.value;
    this.LoginService.register(data).subscribe(results => {
      console.log(results);
      if(results.code==403){
        this.error=results.error;
      }else{
        this.router.navigate(['']);
      }
    });
  }
  login(){
    this.router.navigate([''])
  }
  ngOnInit() {
  }

}
