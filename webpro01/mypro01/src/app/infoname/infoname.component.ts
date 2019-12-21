import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router, ActivatedRoute } from '@angular/router'
import { ExcelService } from '../services/excel.service';
@Component({
  selector: 'app-infoname',
  templateUrl: './infoname.component.html',
  styleUrls: ['./infoname.component.scss']
})
export class InfonameComponent implements OnInit {
  course: object;
  show: any = false;

  constructor(private router: Router, private studentService: StudentService, private route: ActivatedRoute, private excelService: ExcelService) { }

  ngOnInit() {
    this.qruey()
  }
  qruey(){
    this.route.paramMap.subscribe(params => {
      this.studentService.reportCourse(params.get('id')).subscribe(
        (data) => {
          this.course = data[0];
        }
      )
    });
  }
  downloadfile() {
    this.show=true
    var excelfile = [[]] ;
    for (let index = 0; index < this.course['students'].length; index++) {
      excelfile[index] = this.course['students'][index];
      for (let j = 1; j <= 16; j++) {
        excelfile[index]['week'+j]=this.course['students'][index].weeks['week'+j].week;
      }
      delete excelfile[index]['weeks']
    }
    this.excelService.exportAsExcelFile(excelfile, this.course['course_name']);
    this.qruey()
    console.log(this.course);
  }
  back() {
    this.router.navigate([''])
  }
  retest(data) {
    return data.week
  }


}
