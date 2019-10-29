import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {


  students : any

  constructor(private router: Router,private studentService:StudentService) { }

  ngOnInit() {
    this.studentService.getStudent().subscribe((res)=>{
      this.students = res
    });
  }
  back(){
    this.router.navigate([''])
  }

}
