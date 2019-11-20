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
 

  constructor(private route: ActivatedRoute,private studentService: StudentService,private router: Router) { }

  ngOnInit() {
  }
  submid(sutdent : any){
    var idcoure;
    var weeks
    this.route.paramMap.subscribe(params => {
       idcoure= params.get('id').split(',').shift(); 
       weeks= params.get('id').split(',').slice()[1];
    });
    this.studentService.chakname(idcoure,sutdent,weeks).subscribe(
      ()=>{  
        alert(sutdent+' '+'compalass')
        //this.router.navigate(['google.com'])
      }
    )}

}
