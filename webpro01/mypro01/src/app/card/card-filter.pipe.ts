import { PipeTransform, Pipe } from '@angular/core';


@Pipe({
    name: 'cardFilter'
})
export class CardFilterPipe implements PipeTransform{
    transform(card:any,idcard: any): any {
        
        if(!card||!idcard){
            return card
        }
        console.log(card);
        

        return card.filter(res => res.course_id.toLowerCase().indexOf(idcard.toLowerCase()) !==-1);
    }
}