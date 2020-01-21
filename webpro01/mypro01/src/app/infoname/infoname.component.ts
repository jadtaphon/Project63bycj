import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { Router, ActivatedRoute } from '@angular/router'
import { ExcelService } from '../services/excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-infoname',
  templateUrl: './infoname.component.html',
  styleUrls: ['./infoname.component.scss']
})
export class InfonameComponent implements OnInit {
  course: object;
  show: any = false;
  dataStrings: any;
  id: any;

  constructor(private router: Router, private studentService: StudentService, private route: ActivatedRoute, private excelService: ExcelService, private modalService: NgbModal) { }

  ngOnInit() {
    this.qruey()
  }
  qruey() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.studentService.reportCourse(params.get('id')).subscribe(
        (data) => {
          this.course = data[0];
          //console.log(this.course);
          
        }
      )
    });
  }
  //////////////////////////////////downloadfile//////////////////////////////////////////////////////////////////
  downloadfile() {
    this.show = true
    var excelfile = [[]];
    for (let index = 0; index < this.course['students'].length; index++) {
      excelfile[index] = this.course['students'][index];
      

      for (let j = 1; j <= 16; j++) {
        excelfile[index]['week' + j] = this.course['students'][index].weeks['week' + j].week;
      }
      excelfile[index]['course_id']=this.course['course_id'];
      delete excelfile[index]['weeks']
    }
    var nameCoure = this.course['course_name'].split(' ').shift() + "-เทอม:" + this.course['seson'] + "-sec-" + this.course['course_name'].split(' ').pop() + "-" + localStorage.getItem('name');
    this.excelService.exportAsExcelFile(excelfile, nameCoure);
    this.qruey()
  }
  /////////////////////////////////////////////////////////////////////
  showsumfile(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  ///////////////////อ่านชื่อไฟล์////////////////
  sumfile(ent: any) {
    let file = ent.target.files[0];
    let fileName = file.name;
    fileName = fileName.split('.').shift();
    //var nameT = fileName.split('-').pop();//อาจจะได้ใช้
    //this.readfile(ent)
    //console.log(this.dataStrings);
  }
  readfile(evt: any) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = evt.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.dataStrings = jsonData.data;
      this.sumfile(evt);
    }
    reader.readAsBinaryString(file);
  }
  //////////////////////////seve/////////////////////////////
  totle_score() {
    var a = this.sumscore();
    if (a!=null) {
      this.studentService.updateStudent(this.id, a).subscribe();
    }else{
    alert('fire ไม่รงกัน ')
    }
  }
  ///////////////////////////////seve/////////////////////////
  sumscore() {
    if (this.dataStrings.length==this.course['students'].length&&this.dataStrings[0].course_id==this.course['course_id']) {  
    for (let index = 0; index < this.course['students'].length; index++) {
      for (let j = 1; j <= 16; j++) {
        if (this.course['students'][index].weeks['week' + j].week || this.dataStrings[index]['week' + j] == 1) {
          this.course['students'][index].weeks['week' + j].week = 1
          //console.log(1);
        }
        else if (this.course['students'][index].weeks['week' + j].week || this.dataStrings[index]['week' + j] == 0.5) {
          this.course['students'][index].weeks['week' + j].week = 0.5
          //console.log(0.5);
        }
        else {
          this.course['students'][index].weeks['week' + j].week = 0
          //console.log(0);
        }
      }
    }
    return this.course['students'];
    }else{
      return null
    }
  }
  /////////////////////////////////////////////////////
  getscore(data: any) {
    let score = 0;
    for (let i = 1; i <= 16; i++) {
      score += data["week" + i];
    }
    return score;
  }
  back() {
    this.router.navigate([''])
  }
  retest(data) {
    return data.week
  }


}
