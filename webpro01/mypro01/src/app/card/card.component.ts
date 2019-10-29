import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { StudentService } from "../services/student.service"
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  course: any
  constructor(private router: Router, private studentService: StudentService) { }

  ngOnInit() {
    this.studentService.getStudent().subscribe((res) => {
      this.course = res
      

    });
  }
  delete(id:any){
    console.log(id);
     this.studentService.deleteCourse(id).subscribe(
     ()=>{
       console.log(id);
       }
     )
    
     this.router.navigateByUrl('card.component.html', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
  }); 


  }
  pageqr() {

    this.router.navigate(['qrcode'])
  }
  pageup() {
    this.router.navigate(['update'])
  }
  pageinfo() {
    this.router.navigate(['info'])
  }
 

}
