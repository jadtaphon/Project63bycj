import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiURL: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { 

  }

   getStudent() {
    return this.httpClient.get(`${this.apiURL}/getCourse`);
  }
  deleteCourse(id : any){
    return this.httpClient.delete(`${this.apiURL}/deleteCourse/${id}`);
    
  }
}
