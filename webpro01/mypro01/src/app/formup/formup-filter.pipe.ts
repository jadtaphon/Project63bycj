import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
    name: 'formFilter'
})
export class FormFilterPipe implements PipeTransform{
    transform(student:any,id: any): any {
        
        if(!student||!id){
            return student
        }
        console.log(student);
        

        return student.filter(res => res.id_student.toLowerCase().indexOf(id.toLowerCase()) !==-1);
    }
}