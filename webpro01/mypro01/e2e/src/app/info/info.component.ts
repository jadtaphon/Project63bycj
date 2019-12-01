import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { StudentService } from '../services/student.service';
import { Student } from '../models/student';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  course: object
  week: any;
  

  constructor(private router: Router, private studentService: StudentService, private route: ActivatedRoute) { 

   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.studentService.reportCourse(params.get('id')).subscribe(
        (data) => {
          this.course = data[0]; 
        }
      )
    });
  }
  
  back() {
    this.router.navigate([''])
  }
  retest(data){
    return data.week
    
  }
  getTotal(data){   
    let total = 0;
    for(let i = 1; i <= 16; i++){
      total += data["week"+i].week;
  }
  return total;
  }

}
