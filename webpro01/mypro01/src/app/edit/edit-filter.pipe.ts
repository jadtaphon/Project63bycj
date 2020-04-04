import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'editFilter'
})
export class EditFilterPipe implements PipeTransform{
    transform(student:any,id: any): any {
        
        if(!student||!id){
            return student
        }
        console.log(student);
        

        return student.filter(res => res.id_student.toLowerCase().indexOf(id.toLowerCase()) !==-1);
    }
}