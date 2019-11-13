import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiURL: string = 'http://10.0.0.28:8080';

  constructor(private httpClient: HttpClient) {

  }

  getStudent() {
    return this.httpClient.get(`${this.apiURL}/getCourse`);
  }
  createCourse() {
    return this.httpClient.post(`${this.apiURL}/ceate-course`, {

    });
  }
  uploadStudent(course_id: any,course_names: any, times: any, student: any) {
    return this.httpClient.post(`${this.apiURL}/upload`, {
      course_id: course_id,
      course_name:course_names,
      time: times,
      students: student
    });
  }

  deleteCourse(id: any) {
  return this.httpClient.delete(`${this.apiURL}/deleteCourse/${id}`);
  }
  reportCourse(id:any){
    return this.httpClient.get(`${this.apiURL}/report/${id}`);
  }
}
