import { Component, OnInit } from '@angular/core';
import QRCode from 'qrcode'
import { Router, ActivatedRoute } from '@angular/router'
import { StudentService } from '../services/student.service';



@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})

export class QrcodeComponent implements OnInit {

  course: any;
  showstudent: any[] = [];
  idcoure: any;
  weeks: any;
  ip: any;
  cont: any;
  contcome: any;
  pagego: any;

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

    this.qrcode()
  }

  ///////////////////////////////////////////////////////////////////////////////

  qrcode() {
    let opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      rendererOpts: {
        quality: 0.3
      }
    }
    QRCode.toDataURL('http://' + this.ip + ':80/student/' + this.idcoure + ',' + this.weeks, opts, function (err, url) {
      if (err) throw err
      var img = document.getElementById('image');
      img.setAttribute('src', url);
    })
    this.studentcome()
  }
  /////////////////////////////////
  refresh(week: any) {
    this.weeks = week;

    this.studentService.reportCourse(this.idcoure).subscribe(
      (data) => {
        this.course = data[0];
      })
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
    }
  }

  getTotal(data: any) {
    var w = 'week' + this.weeks;

    return data[w].week;
  }

  back() {
    //this.router.navigate(['/'])
    this.router.navigate(['student/' + this.idcoure + ',' + this.weeks])
  }
}
