import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-fromstusent',
  templateUrl: './fromstusent.component.html',
  styleUrls: ['./fromstusent.component.css']
})
export class FromstusentComponent implements OnInit {

  course: any;
  idcoure: any;
  weeks: any;
  gps2: any = [];

  constructor(private route: ActivatedRoute, private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idcoure = params.get('id').split(',').shift();
      this.weeks = params.get('id').split(',').slice()[1];
    });

    var coure = localStorage.getItem('idcoure');
    var weekc = localStorage.getItem('week');

    
    
    

      if (coure == this.idcoure) {
        if (weekc == this.weeks) {
          window.location.href='https://testmypro-01.herokuapp.com/success'
        } 
      }

  

    this.studentService.reportCourse(this.idcoure).subscribe(
      (data) => {
        this.course = data[0];
      });
  }

  submid(sutdent: any) {
    var coure = localStorage.getItem('idcoure');
    var weekc = localStorage.getItem('week');
    var checkid = localStorage.getItem('id_active');
    
    var between = this.getlocaltion();
    if (between <= 150) {
      this.checknamesad(sutdent, coure, weekc, checkid);
    } else {
      alert("can not")
    }
  }
  checknamesad(sutdent: any, coure: any, weekc: any, checkid: any) {
    
    
    if (sutdent != "") {
      console.log(sutdent+"check");
      if (coure == this.idcoure) {
        if (weekc == this.weeks) {
          for (let index = 0; index < this.course.students.length; index++) {
            var check = this.course.students[index].weeks['week' + this.weeks].id_active;
            if (checkid == check) {
              window.location.href='https://testmypro-01.herokuapp.com/success'
            }
          }
        } else {
          this.saddata(sutdent)
        }
      }
      else {
        this.saddata(sutdent)
      }
    } else {
      alert("กรอกรหัส นศ.")
    }
  }
  saddata(sutdent: any) {
    var check = false;
    for (let index = 0; index < this.course['students'].length; index++) {
      if (sutdent == this.course['students'][index].id_student) {
        check = true;
      }
    }
    console.log(check);
    

    if (check) {
      this.studentService.chakname(this.idcoure, sutdent, this.weeks).subscribe(
        () => {
          localStorage.setItem('idcoure', this.idcoure)
          localStorage.setItem('week', this.weeks)
          localStorage.setItem('id_active', sutdent)
          alert('เช็คชื่อเรียบร้อย')
          window.location.href='https://testmypro-01.herokuapp.com/success'
        })
    } else {
      alert("รหัสไม่ถูก")
    }
  }
  getlocaltion() {
    var c = 0;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resp => {
        this.gps2.latitude2 = resp.coords.latitude;
        this.gps2.longtitude2 = resp.coords.longitude;

        c = this.bitween(this.gps2);
      })
    }
    return c;
  }
  bitween(gps2: any) {
    var gps1 = this.studentService.getlocal();

    var dLat = this.degreesToRadians(gps2.latitude2 - gps1.latitude1);
    var dLon = this.degreesToRadians(gps2.longtitude2 - gps1.longitude1);

    var lat1 = this.degreesToRadians(gps1.latitude1);
    var lat2 = this.degreesToRadians(gps2.latitude2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var c = 6371 * c;

    return c;
  }
  degreesToRadians(degrees: any) {
    return degrees * Math.PI / 180;
  }

}
