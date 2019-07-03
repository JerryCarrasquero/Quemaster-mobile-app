import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import { switchMap } from 'rxjs/operators';
import {interval} from 'rxjs';

@Component({
  selector: 'app-taketurn',
  templateUrl: './taketurn.page.html',
  styleUrls: ['./taketurn.page.scss'],
})
export class TaketurnPage implements OnInit {
          place=0;
          placet=0;
          name:string;
          id:number;
          channel:number;
          time:string;
          exist:Boolean;
          token:string;
          polling:Boolean;
          continuopooling:Boolean;
  constructor(private routerh:Router,private router:ActivatedRoute,private storage: Storage,private TaketurnService:LoginService) { 
    this.continuopooling=true;
    this.polling=false;
  }
  
  pushresults(results){
    this.placet=results.place;
    this.place=results.Columplace;
    this.time=results.EstimatedTime;
    this.exist=results.exist;
    console.log(this.polling);
    if(!this.polling){
      this.doPoll();
    }else if(this.polling){
      console.log("not pooling");
    }
   if(this.placet==0&&this.exist==true){
     alert("Es su turno");
   }
  }
  stoppooling(){
    console.log("stop pooling")
    this.continuopooling=false;
  }
  f2(a:number,b:String){
    this.TaketurnService.position(a,b).subscribe(results=>{
      this.pushresults(results);
    console.log(results);
    })
  }
  doPoll(){
    this.polling=true;
    if (this.continuopooling){
     console.log("xansaiood request");
      interval(10000).pipe(
        switchMap(() =>  this.TaketurnService.position(this.channel,this.token))
    ).subscribe(data => {
        this.pushresults(data);
      }
    );
    }
  }

  taketurn(a:string){
    console.log("take turn")
      let data={
        accion:a,
        token:this.token,
        id:this.id,
        idc:this.channel
      };
    if (a=="yes" || a=="no"){
    this.TaketurnService.dropline(data).subscribe(results =>{
      console.log(results);
      this.routerh.navigate(['/home']);
    });
    }else{ 
    this.TaketurnService.upload(data).subscribe(results => {
      this.place=results.Columplace;
      this.placet=results.total;
      this.time=results.EstimatedTime;
      alert("Your Turn is "+this.place)
      this.exist=true;
      });
    }
  }
  ngOnInit() {
    this.router.params.subscribe(params =>{
      this.id= params['p2'];
      this.name= params['p1'];
      this.channel=params['p3'];
      this.storage.get('token').then((val) => {
        this.token=val;
        this.f2(this.channel,val);
      });
    }); 
  }
}
