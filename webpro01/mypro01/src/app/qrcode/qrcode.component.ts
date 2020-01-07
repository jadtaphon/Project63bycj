import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router'
import { StudentService } from '../services/student.service';
import { interval, Subscription, Observable } from 'rxjs';



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
  testt: any;
  contcome: any;
  subscription: Subscription;
  show: any = true;
  localtion: any = []


  constructor(private router: Router, private studentService: StudentService, private route: ActivatedRoute) {

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
        console.log(this.course);
      });

      
  }
  student(week: any) {
    this.weeks = week;
    //console.log(this.qrcode_url);

    // const source = interval(1000);

    this.qruery()
    // this.subscription = source.subscribe(val => this.qruery());

    this.qrcode()
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
  qrcode() {
    this.qrcode_url = 'http://' + this.ip + ':80/student/' + this.idcoure + ',' + this.weeks;
  }
  /////////////////////////////////
  test() {
    this.qruery();
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
    //console.log(122233322);
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
    //this.router.navigate(['/'])
    this.router.navigate(['student/' + this.idcoure + ',' + this.weeks])
    //this.subscription.unsubscribe();
  }
  getlocaltion() {
    var a = this.studentService.getlocal();
    //console.log(a);
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
