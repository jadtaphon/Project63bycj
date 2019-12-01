import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { Router, ActivatedRoute } from '@angular/router'
import { StudentService } from '../services/student.service';
@Component({
  selector: 'app-fromstusent',
  templateUrl: './fromstusent.component.html',
  styleUrls: ['./fromstusent.component.scss']
})
export class FromstusentComponent implements OnInit {
  course: any;
  idcoure: any;
  weeks: any;
  constructor(private route: ActivatedRoute, private studentService: StudentService, private router: Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.idcoure = params.get('id').split(',').shift();
      this.weeks = params.get('id').split(',').slice()[1];
    });

    this.studentService.reportCourse(this.idcoure).subscribe(
      (data) => {
        this.course = data[0];
      });


  }
  submid(sutdent: any) {
    var coure = localStorage.getItem('idcoure');
    var weekc = localStorage.getItem('week');
    var checkid = localStorage.getItem('id_active');

    if (coure == this.idcoure) {
      if (weekc == this.weeks) {
        for (let index = 0; index < this.course.students.length; index++) {
          var check = this.course.students[index].weeks['week' + this.weeks].id_active;
          console.log(check);
          if (checkid == check) {
            alert(this.course.students[index].name + ' เช็คชื่อไปแล้ว')
            break;
          }
        }
      } else {
        this.saddata(sutdent)
        alert('เช็คชื่อเรียบร้อย')
      }
    } else {
      this.saddata(sutdent)
      alert('เช็คชื่อเรียบร้อย')
    }
  }

  saddata(sutdent: any) {
    this.studentService.chakname(this.idcoure, sutdent, this.weeks).subscribe(
      () => {
        localStorage.setItem('idcoure', this.idcoure)
        localStorage.setItem('week', this.weeks)
        localStorage.setItem('id_active', sutdent)
      })
  }
}

