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
  devip: any;
  idcoure: any;
  weeks: any;
  ip: any;

  constructor(private router: Router, private studentService: StudentService, private route: ActivatedRoute) {
    // var address = require('address');
    // this.ipAddress = address.ip();
    // console.log(this.ipAddress);

  }

  ngOnInit() {
    this.studentService.getIP().subscribe(
      (data) => {
        this.ip = data;
      }
    )
    // this.studentService.reportCourse(idcoure).subscribe(
    //   (data) => {
    //     this.course = data[0];
    //     console.log(this.course);
    //   }
    // )
  }
  student(week: any) {
    this.weeks = week;
    this.route.paramMap.subscribe(params => {
      this.idcoure = params.get('id');
      let opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        rendererOpts: {
          quality: 0.3
        }
      }
      QRCode.toDataURL('http://'+this.ip+':4200/student/' + this.idcoure + ',' + this.weeks, opts, function (err, url) {
        if (err) throw err
        var img = document.getElementById('image');
        img.setAttribute('src', url);
      })
      // this.studentService.reportCourse(params.get('id')).subscribe(
      //   (data) => {
      //     this.course = data[0];
      //     console.log(this.course);

      //   }
      // )

      //console.log(params.get('id'));

    });

    //console.log(week);

    //this.router.navigate(['student/' + this.idcoure])
  }
  qrcode() {
    this.router.navigate(['student/' + this.idcoure + ',' + this.weeks])
  }

}
