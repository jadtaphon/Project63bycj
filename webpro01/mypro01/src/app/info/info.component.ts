import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { StudentService } from '../services/student.service';
import * as $ from "jquery"

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  course: any;
  idcoure: any;
  week: any;
  twee: any;
  showS: any = false;


  constructor(private router: Router, private studentService: StudentService, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idcoure = params.get('id').split(',').shift();
      this.twee = params.get('id').split(',').slice()[1];
      if (this.twee == null) {
        this.twee = 1;
      } else {
        this.showS = true;
      }
    });
    this.studentService.reportCourse(this.idcoure).subscribe(
      (data) => {
        this.course = data[0];
      });
  }
  student(weeks: any) {
    this.twee = weeks;
    console.log(this.twee);
  }

  chackbyTcome(idstudent: any, count: number) {
    this.studentService.chakname(this.idcoure, idstudent, this.twee).subscribe(
      () => {
        console.log("เข้ายุ");
        this.studentService.reportCourse(this.idcoure).subscribe(
          (data) => {
            this.course = data[0];
          });

        // $(document).ready(function(){
        //   location.reload();
        //   });
        //window.location.reload();
      }
    )
  }
  chackbyTlast(idstudent: any, count: number) {
    this.studentService.chacknameby_t(this.idcoure, idstudent, this.twee).subscribe(
      () => {
        console.log("สาย");
        this.studentService.reportCourse(this.idcoure).subscribe(
          (data) => {
            this.course = data[0];
          });
        // window.location.reload();
      }
    )
  }

  back() {
    this.router.navigate([''])
  }
  retest(data) {
    return data["week" + this.twee].week

  }
  getTotal(data) {
    let total = 0;
    for (let i = 1; i <= 16; i++) {
      total += data["week" + i].week;
    }
    return total;
  }

}
