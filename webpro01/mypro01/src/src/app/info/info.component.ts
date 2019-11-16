import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router'
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {


  course : object
  count:any;
  

  constructor(private router: Router,private studentService:StudentService,private route:ActivatedRoute ) { }

  ngOnInit() {
    this.count=Array(16);
    this.route.paramMap.subscribe(params => {
        this.studentService.reportCourse(params.get('id')).subscribe(
          (data)=>{
            this.course=data[0];
            console.log(this.course);
            
          }
        )
     
    });
  }
  back(){
    this.router.navigate([''])
  }

}
