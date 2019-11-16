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
   idcoure :any;
   weeks:any;
  // ipAddress: any;

  constructor(private router: Router, private studentService: StudentService, private route: ActivatedRoute) {
    // var address = require('address');
    // this.ipAddress = address.ip();
    // console.log(this.ipAddress);
    
  }

  ngOnInit() {
    // this.studentService.reportCourse(idcoure).subscribe(
      //   (data) => {
      //     this.course = data[0];
      //     console.log(this.course);
          
      //   }
      // )
  }
  student(week : any){
    this.route.paramMap.subscribe(params => {
      let opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        rendererOpts: {
          quality: 0.3
        }
      }
      QRCode.toDataURL('http://192.168.43.88:4200/student/'+this.idcoure+','+this.weeks, opts, function (err, url) {
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
      this.idcoure=params.get('id');
      //console.log(params.get('id'));
      
    });
    this.weeks=week;
    //console.log(week);
    
    //this.router.navigate(['student/' + this.idcoure])
  }
  qrcode() {
    this.router.navigate(['student/' + this.idcoure+','+this.weeks])
  }

}
