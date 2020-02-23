import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router'
import { StudentService } from '../services/student.service';
import { HerokuService } from '../services/heroku.service'
import { interval, Subscription, Observable, BehaviorSubject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { takeWhile, tap } from 'rxjs/operators';



@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})

export class QrcodeComponent implements OnInit {
  ////////////////localtion//////////////////////////////////////////
  [x: string]: any;
  qrcode_url = "";
  course: any;
  showstudent: any[] = [];

  getKey: any
  idcoure: any;
  keycoure: any
  weeks: any;

  ip: any;
  cont: any;
  testt: any;
  contcome: any;
  subscription: Subscription;
  show: any = true;
  ////////////////localtion//////////////////////////////////////////
  show2: any = false;
  localtion: any = []
  ////////////////time QR//////////////////////////////////////////
  timerSrarted$ = new BehaviorSubject(false);
  isAlive = true;
  draw2cards = false;
  timer;
  time: any = 300;
  ti = true;

  timeqrcode = true;


  constructor(private router: Router, private studentService: StudentService, private route: ActivatedRoute, private modalService: NgbModal, private herokuService: HerokuService) {
    studentService.messages.subscribe(msg => {

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
      this.idcoure = params.get('id').split(',').shift();
      this.keycoure = params.get('id').split(',').slice()[1];
    });
    this.studentService.reportCourse(this.idcoure).subscribe(
      (data) => {
        this.course = data[0];
        this.cont = this.course.students.length;
      });
    ////////////////time out///////////////////////////////////////////////////
    this.timerSrarted$.pipe(
      takeWhile(() => this.isAlive),
      tap((next) => {
        if (next) {
          this.ti = false;
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            this.draw2cards = true;
            this.herokuService.updateQR(this.keycoure, this.idcoure,"https://testmypro-01.herokuapp.com/").subscribe()
            document.getElementById('close').click()
            //console.log(this.timerSrarted$);
            this.qrcode_url = "timeout"
            console.log(this.qrcode_url);
            this.timerSrarted$.next(false);
          }, this.time * 1000)
        }
      })

    ).subscribe();
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }
  student(week: any, times: any, content) {
    this.weeks = week;
    this.time = times;
    console.log(this.ip);
    
    var herokuUrl = 'http://'+this.ip+':80/student/' + this.idcoure + ',' + this.weeks;
    console.log(herokuUrl);
    
    this.heroku(herokuUrl,content)
    this.qruery()
    this.show2 = true;
    this.show = false;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resp => {
        this.localtion.latitude1 = resp.coords.latitude;
        this.localtion.longitude1 = resp.coords.longitude;
      })
    } else {
      alert('ไม่รองรับ gps')
    }
  }
  //////////////////heroku/////////////////////////////////////////////
  heroku(herokuUrl:any,content){
    this.herokuService.getAll().subscribe(
      (data) => {
        var status;
        for (let i = 0; i < data.length; i++) {
          if (data[i]['course_id'] == this.keycoure||data==null) {
            status = false;
          } else {
            status = true;
          }
        }
        if (status) {
          console.log('create');
          this.herokuService.craeteQR(this.keycoure, this.idcoure, herokuUrl).subscribe(
            (Key) => {
              this.getKey = Key['key'];
              this.qrcode(content,this.getKey)
            });
        } else {
          console.log('update');
          this.herokuService.updateQR(this.keycoure, this.idcoure,herokuUrl).subscribe(
            (key) => {
              this.getKey = key;
              this.qrcode(content,this.getKey)
            }
          );
        }
      })
  }
  ////////////////////////////////////////////////////////////////////////////
  //////////////////////////qrcode/////////////////////////////////////////////////////
  qrcode(content,getKey:any) {
    this.modalService.open(content, { size: 'xl', backdropClass: 'light-blue-backdrop' });
    this.qrcode_url = 'https://testmypro-01.herokuapp.com/getKey/' + getKey;
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
    }
  }
///////////////////////////////////////////////////////////////////////////////
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
  ngOnDestroy() {
    this.isAlive = false;
  }
}
