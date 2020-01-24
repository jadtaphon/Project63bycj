import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router'
import { StudentService } from '../services/student.service';
import { interval, Subscription, Observable, BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeWhile, tap } from 'rxjs/operators';



@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})

export class QrcodeComponent implements OnInit {
  [x: string]: any;
  qrcode_url = "";
  course: any;
  showstudent: any[] = [];
  idcoure: any;
  weeks: any;
  ip: any;
  cont: any;
  testt: any;
  contcome: any;
  subscription: Subscription;
  show: any = true;
  //show1: any = true;
  show2: any = false;
  localtion: any = []

  timerSrarted$ = new BehaviorSubject(false);
  isAlive = true;
  draw2cards = false;
  timer;
  time: any = 5;
  ti = true;


  constructor(private router: Router, private studentService: StudentService, private route: ActivatedRoute, private modalService: NgbModal) {

    studentService.messages.subscribe(msg => {
      //console.log(msg.action);
      if (msg.action == "[student][checkname]") {

        this.studentService.reportCourse(this.idcoure).subscribe((data) => {
          this.course = data[0];
          this.cont = this.course.students.length;

          this.studentcome()
        })
        //console.log(this.showstudent);
      }
    });
  }
  ///////////////////////////////////////////////////////////////
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
        //console.log(this.course);
        this.cont = this.course.students.length;
      });

    ////////////////////////

    this.timerSrarted$.pipe(
      takeWhile(() => this.isAlive),
      tap((next) => {
        if (next) {
          this.ti = false;
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.draw2cards = true;
            document.getElementById('close').click()
            //console.log(this.timerSrarted$);
            this.timerSrarted$.next(false);
          }, this.time * 1000)
        }
      })

    ).subscribe();
  }
  student(week: any, content) {
    this.weeks = week;
    //console.log(this.qrcode_url);
    // const source = interval(1000);
    this.qruery()
    // this.subscription = source.subscribe(val => this.qruery());
    this.qrcode(content)
    this.show2 = true;
    this.show = false;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resp => {
        this.localtion.latitude1 = resp.coords.latitude;
        this.localtion.longitude1 = resp.coords.longitude;
        //console.log(this.localtion);
        // this.studentService.keeplocal(this.localtion);
      })
    } else {
      alert('ไม่รองรับ gps')
    }
  }
  ///////////////////////////////////////////////////////////////////////////////
  qrcode(content) {
    this.modalService.open(content, { size: 'lg', backdropClass: 'light-blue-backdrop' });

    this.qrcode_url = 'http://' + this.ip + ':80/student/' + this.idcoure + ',' + this.weeks;
  }
  ////////////////////////////////
  qruery() {
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
    //console.log(this.course.students);


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
    //console.log(this.showstudent);
  }

  getTotal(data: any) {
    var w = 'week' + this.weeks;

    return data[w].week;
  }
  fixinfo() {
    this.router.navigate(['info/' + this.idcoure + ',' + this.weeks])
  }
  back() {
    this.router.navigate(['student/' + this.idcoure + ',' + this.weeks])
  }
  reset() {
    window.location.reload()
  }
  // getlocaltion() {
  //   var a = this.studentService.getlocal();
  //   console.log(a);
  // }
  ngOnDestroy() {
    this.isAlive = false;
  }
}
