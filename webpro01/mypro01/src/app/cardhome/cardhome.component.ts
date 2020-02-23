import { Component, OnInit } from '@angular/core';
import { StudentService } from "../services/student.service"

@Component({
  selector: 'app-cardhome',
  templateUrl: './cardhome.component.html',
  styleUrls: ['./cardhome.component.scss']
})
export class CardhomeComponent implements OnInit {
  namet: any;
  numcourse:any =0;
  show: any = false;
  constructor(private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudent().subscribe(
      (data)=>{
        this.numcourse=data.length
      }
    )
    if (localStorage.getItem('name') != null) {
      this.namet= localStorage.getItem('name');
      this.show = true;
    }
  }
  nameT(names: any) {
    this.namet = names;
    localStorage.setItem('name', names)
    location.reload();
    this.show = true;
  }

}
