import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';

@Injectable({
  providedIn: 'root'
})
export class HerokuService {

  apiURL : string = "https://testmypro-01.herokuapp.com"

  constructor(private httpClient: HttpClient) { }


  getAll(){
    return this.httpClient.get(`${this.apiURL}/getAll`);
  }

  getKey(key:any){
    return this.httpClient.get(`${this.apiURL}/getKey/`+key)
  }

  craeteQR(idcours:any,keycours:any,herokuUrl:any){
    return this.httpClient.post(`${this.apiURL}/createqr`,{
      course_id:idcours,
      course_key:keycours,
      url:herokuUrl
    });
  }

  updateQR(idcours:any,keycours:any,herokuUrl:any){
    var Data:any = new FormData();
    Data.append("courseid",idcours)
    Data.append("coursekey",keycours)
    Data.append("url",herokuUrl)
    return this.httpClient.post(`${this.apiURL}/updateqr`,Data)
  }

}


