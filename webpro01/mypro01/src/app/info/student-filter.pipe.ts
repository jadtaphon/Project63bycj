import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
    name: 'studentFilter'
})
export class StudentFilterPipe implements PipeTransform {
    transform(students: any, statusShow?: any): any {
        var weekthis = "week" + statusShow[0].week;
        var status = statusShow[1].status;

        if (status == "ทั้งหมด") {
            //console.log('test1');
            return students;
        }
        return students.filter((val) => {
            let rVal;
            for (let index = 0; index < students.length; index++) {
                if (val.weeks[weekthis].week == status) {
                    rVal = students[index]
                }
            }
            return rVal;
        })
    }
}