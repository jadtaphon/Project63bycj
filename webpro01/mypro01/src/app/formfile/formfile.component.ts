import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Router } from "@angular/router";
import { StudentService } from "../services/student.service"

@Component({
  selector: 'app-formfile',
  templateUrl: './formfile.component.html',
  styleUrls: ['./formfile.component.scss']
})
export class FormfileComponent implements OnInit {

  data: any
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  wss: any

  student: any[][] = [[]];
  course : any;
  course_id: any;
  course_name: any;
  classroom:any;
  time: any;

  constructor(private router: Router, private studentService: StudentService) { }

  ngOnInit() {
  }
  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      this.wss = [ws.B4.w, ws.B6.w, ws.M4.w]

      /* save data */
      this.data = <any>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.course = ws.B4.w;
      this.time = ws.B6.w;
      for (let i = 9; i <= this.data.length - 3; i++) {
        this.student[i - 9] = this.data[i];
        for (let j = 1; j <= 3; j++) {
          this.student[i - 9]['number'] = this.data[i][1];
          this.student[i - 9]['id_student'] = this.data[i][2];
          this.student[i - 9]['name'] = this.data[i][3];

        }
        this.student[i - 9].splice(0)
      }
    this.course_id = this.course.substr(10,7);
    this.course_name=this.course.substr(19);
    this.time=this.time.substr(13);
    };
   return reader.readAsBinaryString(target.files[0]);

    
  }

  upload() {
    var data =[];

    for (var key in this.student) {
        
          data.push({
                'number_id': this.student[key]['number'],
                'id_student': this.student[key]['id_student'],
                'name': this.student[key]['name']
            });
        
    }
    this.studentService.uploadStudent(this.course_id,this.course_name, this.time, data).subscribe(
      () => {
        this.router.navigate(['/'])
      }
    )
  }
}
