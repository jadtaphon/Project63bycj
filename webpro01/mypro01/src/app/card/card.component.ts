import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router'
import { StudentService } from "../services/student.service"

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  course: any;
  search: any;
  p:number=1;
  namet: any;
  show: any = false;
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 2', cols: 2, rows: 1 },
        ];
      }

      return [
        { title: 'Card 2', cols: 2, rows: 1 },
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,private router: Router, private studentService: StudentService) {

  }
  ngOnInit() {
    this.studentService.getStudent().subscribe(
      (res) => {
      this.course = res
    });

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

  delete(id:any){
     this.studentService.deleteCourse(id).subscribe(
     ()=>{
      window.location.reload();
       }
     )

    
     this.router.navigateByUrl('card.component.html', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
  }); 


  }
  pageqr(id:any,key:any) {

    this.router.navigate(['qrcode/'+id+","+key]);
  }
  pageup(id :any) {
    this.router.navigate(['update/'+id]);
  }
  pageinfo(id:any) {
     this.router.navigate(['info/'+id]);
  }
  pageinfoname(id:any){
    this.router.navigate(['infoname/'+id]);
  }
  
  sfc(data) {

    data = data.split('-').shift();
    return data
  }
  sfn(data){
    var va= data.split(' ').shift();
    var va1 = data.split(' ').slice()[6];
    var va2 = data.split(' ').slice()[8];
    return va+" "+va1+" "+va2
  }

}
