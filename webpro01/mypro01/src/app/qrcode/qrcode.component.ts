import { Component, OnInit } from '@angular/core';
import QRCode from 'qrcode'
import { Router, ActivatedRoute  } from '@angular/router'
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {
  course : any;
  constructor(private router: Router,private studentService:StudentService,private route:ActivatedRoute  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
    let opts = {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        rendererOpts: {
            quality: 0.3
        }
      }
      QRCode.toDataURL('http://10.0.0.28:4200/student/', opts, function (err, url) {
        if (err) throw err
        var img = document.getElementById('image');
        img.setAttribute('src',url);
      })

      
        this.studentService.reportCourse(params.get('id')).subscribe(
          (data)=>{
            this.course=data[0];
            console.log(this.course);
          }
        )
    });
  }
  qrcode(id:any){
    this.router.navigate(['info/'+id])
  }

}
