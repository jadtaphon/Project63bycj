import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  

  apiURL: string
  api: any

  constructor(private httpClient: HttpClient) {
    // this.httpClient.get('http://localhost:8080/getIP').subscribe(
    //   (data)=>{
    //     this.api='http://'+data.toString()+':80';
    //   }
    // )
    this.apiURL = 'http://10.0.0.27:443';
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
  uploadStudent(course_id: any, course_names: any, times: any, student: any) {
    return this.httpClient.post(`${this.apiURL}/upload`, {
      course_id: course_id,
      course_name: course_names,
      time: times,
      students: student
    });
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
