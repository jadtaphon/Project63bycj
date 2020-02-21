import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Local } from 'protractor/built/driverProviders';
import { SocketService } from '../services/socket.service';
import { Subject } from 'rxjs';
import { delay, map } from 'rxjs/operators'

const SOCKET_URL = "ws://10.0.1.37:443/ws";

export interface Message {
  action: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService implements OnInit {

  Localtion: any = []
  apiURL: string
  //api: any
  public messages: Subject<Message>;

  constructor(private httpClient: HttpClient, private socketService: SocketService) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resp => {
        this.Localtion.latitude1 = resp.coords.latitude;
        this.Localtion.longitude1 = resp.coords.longitude;
      })
    }
    ///////////////////////////////////////////////
    this.messages = <Subject<Message>>socketService.connect(SOCKET_URL).pipe(
      map(
        (response: MessageEvent): Message => {
          let data = JSON.parse(response.data);
          return {
            action: data.action,
            message: data.message
          }
        }
      )
    )
    ////////////////////////////////////////////////////////////

    //this.apiURL = 'http://10.35.1.89:443';
    this.apiURL = 'http://10.0.1.37:443'
  }
  ngOnInit() {
    //  this.httpClient.get('http://localhost:443/getIP').subscribe(
    //   (data)=>{
    //     this.apiURL='http://'+data.toString()+':443';
    //     console.log(this.apiURL);
    //   }
    // )
  }

  getStudent() {
    return this.httpClient.get(`${this.apiURL}/getCourse`);
  }
  getIP() {
    return this.httpClient.get(`${this.apiURL}/getIP`)
  }

  chakname(id: any, stdids: any, weeks: any) {
    var Data: any = new FormData();
    Data.append("stdid", stdids);
    Data.append("week", weeks);
    return this.httpClient.post(`${this.apiURL}/chackname/${id}`, Data);
  }
  chacknameby_t(id: any, stdids: any, weeks: any) {
    var Data: any = new FormData();
    Data.append("stdid", stdids);
    Data.append("week", weeks);
    return this.httpClient.post(`${this.apiURL}/chacknameT/${id}`, Data);
  }
  checknameOut_t(id: any, stdids: any, weeks: any) {
    var Data: any = new FormData();
    Data.append("stdid", stdids);
    Data.append("week", weeks);
    return this.httpClient.post(`${this.apiURL}/checknameO/${id}`, Data);
  }
  uploadStudent(course_id: any, course_names: any, times: any, sesons: any, student: any) {
    return this.httpClient.post(`${this.apiURL}/upload`, {
      course_id: course_id,
      course_name: course_names,
      time: times,
      seson: sesons,
      students: student
    });
  }
  updateStudent(id: any, dataupdate: any) {
    return this.httpClient.post(`${this.apiURL}/updatescore/${id}`, {
      students: dataupdate
    });
  }
  getlocal() {
    return this.Localtion
  }
  addstudent(idcoure: any, idstudent: any, names: any, number: any) {
    return this.httpClient.post(`${this.apiURL}/addupstudent/${idcoure}`, {
      number_id: number,
      id_student: idstudent,
      name: names
    })
  }
  editstudent(idcoure: any, idstudent: any, names: any, number: any) {
    return this.httpClient.post(`${this.apiURL}/editstudent/${idcoure}`, {
      number_id: number,
      id_student: idstudent,
      name: names
    })
  }
  deletestudent(idcoure: any, idstudent: any) {
    return this.httpClient.post(`${this.apiURL}/deletestudent/${idcoure}`, {
      id_student: idstudent
    })
  }
  deleteCourse(id: any) {
    return this.httpClient.delete(`${this.apiURL}/deleteCourse/${id}`);
  }
  reportCourse(id: any) {
    return this.httpClient.get(`${this.apiURL}/report/${id}`);
  }
  ferseh() {

  }
}
