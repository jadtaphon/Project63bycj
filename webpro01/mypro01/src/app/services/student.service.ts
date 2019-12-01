import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiURL: string 
  api : any

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('http://localhost:8080/getIP').subscribe(
      (data)=>{
        this.api='http://'+data.toString()+':8080';
      }
    )
    this.apiURL = 'http://10.0.1.44:8080';
  }

  getStudent() {
    return this.httpClient.get(`${this.apiURL}/getCourse`);
  }
  getIP(){
    return this.httpClient.get(`${this.apiURL}/getIP`)
  }

  chakname(id: any, stdids: any, weeks: any) {
    var Data: any = new FormData();
    Data.append("stdid", stdids);
    Data.append("week", weeks);
    return this.httpClient.post(`${this.apiURL}/chackname/${id}`,Data);
  }
  uploadStudent(course_id: any, course_names: any, times: any, student: any) {
    return this.httpClient.post(`${this.apiURL}/upload`, {
      course_id: course_id,
      course_name: course_names,
      time: times,
      students: student
    });
  }
  deleteCourse(id: any) {
    return this.httpClient.delete(`${this.apiURL}/deleteCourse/${id}`);
  }
  reportCourse(id: any) {
    return this.httpClient.get(`${this.apiURL}/report/${id}`);
  }
}
