import { Component } from '@angular/core';
import {LoginService} from '../services/login.service'
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private places: Array<any>;
  name:string;
  constructor(public turn:LoginService,private router:Router,private Storage:Storage) {
    this.places=[];
  }

  
  pushresults(results:any):any{
    for (let i=0; i<results.length;i++){
      this.places.push(results[i]);
    }
  }
  gotobooth(a:string,b:number,c){
    this.router.navigate(['taketurn',a,b,c]);
  }
  ticketboot(names:string,id:number,ex:boolean):void{
    console.log(names);
    console.log(id);
    console.log(ex);
    this.turn.channels(id).subscribe(results=>{
      this.name=names;
      if(ex){ 
      this.places=[];  
      this.pushresults(results);
      }else{
        this.gotobooth(names,results[0].id,results[0].channelid);
      }
    })
  }
  ticketboot2(name:string,id:number,channelid:number):void{
    this.gotobooth(this.name,id,channelid);
  }
  finishsession(){
    console.log("fired");
    this.Storage.remove("token");
    this.router.navigate([""]);
  }
  loadcontent(){
    this.turn.industries().subscribe(result=>{
      this.places=[];
      console.log(result);
      this.pushresults(result);
    })
  }
  ngOnInit(){
    this.loadcontent();
  }
}
