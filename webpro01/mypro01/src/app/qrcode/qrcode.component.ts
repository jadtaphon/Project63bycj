import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router'
import { StudentService } from '../services/student.service';
import { interval, Subscription } from 'rxjs';



@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})

export class QrcodeComponent implements OnInit {
  qrcode_url = "";
  course: any;
  showstudent: any[] = [];
  idcoure: any;
  weeks: any;
  ip: any;
  cont: any;
  contcome: any;
  subscription: Subscription;
  show: any = true;


  constructor(private router: Router, private studentService: StudentService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.studentService.getIP().subscribe(
      (data) => {
        this.ip = data;
      });

    this.route.paramMap.subscribe(params => {
      this.idcoure = params.get('id');
    });
    this.studentService.reportCourse(this.idcoure).subscribe(
      (data) => {
        this.course = data[0];
        this.cont = this.course.students.length;
      });

  }
  student(week: any) {
    this.weeks = week;
    const source = interval(1000);

    this.qruery()
    this.subscription = source.subscribe(val => this.qruery());

    this.qrcode()
    this.show = false;
  }
  ///////////////////////////////////////////////////////////////////////////////

  qrcode() {
    this.qrcode_url = 'http://' + this.ip + ':80/student/' + this.idcoure + ',' + this.weeks;
  }
  /////////////////////////////////
  qruery() {
    console.log('1');

    this.studentService.reportCourse(this.idcoure).subscribe((data) => {
      this.course = data[0];
      this.cont = this.course.students.length;
    })
    this.studentcome()
  }

  studentcome() {
    var w = 'week' + this.weeks;
    this.contcome = 0;
    var i = 0;

    for (let index = 0; index < this.course.students.length; index++) {

      var wk = this.course.students[index].weeks[w].week;

      if (wk == 1) {
        this.showstudent[i] = this.course.students[index];
        i++;
        this.contcome++;
      }
      //  if (wk == 0 || wk == 0.5) {
      //   //this.showstudent[i].splice(0);
      //   console.log('1');

      // }
    }
  }

  getTotal(data: any) {
    var w = 'week' + this.weeks;

    return data[w].week;
  }
  fixinfo() {
    this.router.navigate(['info/' + this.idcoure + ',' + this.weeks])
  }

  back() {
    this.router.navigate(['/'])
    //this.router.navigate(['student/' + this.idcoure + ',' + this.weeks])
    this.subscription.unsubscribe();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
