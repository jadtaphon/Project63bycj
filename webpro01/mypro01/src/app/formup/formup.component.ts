import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { StudentService } from '../services/student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-formup',
  templateUrl: './formup.component.html',
  styleUrls: ['./formup.component.scss']
})
export class FormupComponent implements OnInit {
  course: any;
  showlist: any = true;
  showB: any = false;
  idcoure: any;
  number: any;
  statuspopup: any = true;
  numadd: any;
  constructor(private router: Router, private studentService: StudentService, private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.idcoure = params.get('id')
      this.studentService.reportCourse(this.idcoure).subscribe(
        (data) => {
          this.course = data[0];
          this.number = this.course.students.length;
        }
      )

    });
  }
  addup(idstudent: any, namef: any, namel: any) {
    var name = namef + " " + namel
    this.number += 1;
    this.studentService.addstudent(this.idcoure, idstudent, name, this.number).subscribe(
      () => {
        alert("status OK")
        this.studentService.reportCourse(this.idcoure).subscribe(
          (data) => {
            this.course = data[0];
          }
        )
        document.getElementById('close1').click()
      }
    )
  }
  editstudent(idstudent: any, name: any, number: any) {
    this.studentService.editstudent(this.idcoure, idstudent, name, number).subscribe(
      () => {
        alert("status OK")
        this.studentService.reportCourse(this.idcoure).subscribe(
          (data) => {
            this.course = data[0];
          }
        )
        document.getElementById('close2').click()
      }
    )
  }
  delete(id: any) {
    this.studentService.deletestudent(this.idcoure, id).subscribe(
      () => {
        this.studentService.reportCourse(this.idcoure).subscribe(
          (data) => {
            this.course = data[0];
          }
        )
      }
    );
  }
  show() {
    this.showlist = false;
    this.showB = true;
  }
  showadd(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  unshow() {
    this.showB = false;
    this.showlist = true;
  }
  back() {
    this.router.navigate([''])
  }

}
