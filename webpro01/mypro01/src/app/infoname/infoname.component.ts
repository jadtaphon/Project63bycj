import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router, ActivatedRoute  } from '@angular/router'

@Component({
  selector: 'app-infoname',
  templateUrl: './infoname.component.html',
  styleUrls: ['./infoname.component.scss']
})
export class InfonameComponent implements OnInit {

  constructor(private router: Router,private studentService:StudentService,private route:ActivatedRoute) { }
  course : object;
  count:any;
  ngOnInit() {
    this.count=Array(16);
    this.route.paramMap.subscribe(params => {
        this.studentService.reportCourse(params.get('id')).subscribe(
          (data)=>{
            this.course=data[0];
          }
        )
     
    });
  }
  back(){
    this.router.navigate([''])
  }


}
