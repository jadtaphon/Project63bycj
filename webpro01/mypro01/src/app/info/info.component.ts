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
  //courseShow: any;
  idcoure: any;
  //week: any;
  twee: any;
  showS: any = false;
  statusShow: any="ทั้งหมด";

  p:number=1;


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
  student(weeks: any,status:any) {
    
    this.twee = weeks;
    this.statusShow=status;
  }
  search(status: any) {
    var count = 0;
    
      for (let index = 0; index < this.course['students'].length; index++) {
        var data = this.course['students'][index].weeks['week' + this.twee].week
        if (data == 1&& status==1) {
          
          count ++;
        }else if (data == 0.5&& status==2) {
          count ++;
        }else if (data == 0&& status==3) {
          count ++;
        }else if (status=="ทั้งหมด") {
          count ++;
        }
      }
    
    console.log(count);
   
    
    
  }
  chackbyTcome(idstudent: any, count: number) {
    this.studentService.chakname(this.idcoure, idstudent, this.twee).subscribe(
      () => {
        console.log("เข้ายุ");
        this.studentService.reportCourse(this.idcoure).subscribe(
          (data) => {
            this.course = data[0];
          });
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
  chackbyOut(idstudent: any, count: number) {
    this.studentService.checknameOut_t(this.idcoure, idstudent, this.twee).subscribe(
      () => {
        console.log("ขาด");
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
