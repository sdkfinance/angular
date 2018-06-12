import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'isEmpty'
})
export class IsEmptyPipe implements PipeTransform {

    transform(value: any, message?: string): any {
        let result;
        //  value = value.toString();
        if (value === null) {
            result = message;
        } else {
            result = value;
        }
        return result;
    }

}
