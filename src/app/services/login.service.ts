import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }
  //url: String = "http://localhost:8080/Sirvientedecolas/rest/rest/";
  url: String = "http://192.168.43.55:8080/Sirvientedecolas/rest/rest/";
  login(data){
    return this.http.post<any>( `${this.url}login`,JSON.stringify(data),{withCredentials: true});
  }
  register(data){
    return this.http.post<any>( `${this.url}register`,JSON.stringify(data));
  }
  industries(){
    return this.http.get<any>(`${this.url}industries`);
  }
  channels(data:number){
    return this.http.get<any>(`${this.url}channels?id=`+data);
  }
  position(data:number,data2:String){
    return this.http.get<any>(`${this.url}seeplaces?id=`+data+`&token=`+data2);
  }
  dropline(data:any){
    return this.http.post<any>( `${this.url}dropturn`,JSON.stringify(data));
  }
  upload(data:any){
    return this.http.post<any>( `${this.url}taketurn`,JSON.stringify(data));
  }
}
