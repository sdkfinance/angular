import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'firstIsUpper'
})
export class FirstIsUpperPipe implements PipeTransform {

    transform(string: any, args?: any): any {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

}
