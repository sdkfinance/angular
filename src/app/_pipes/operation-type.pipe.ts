import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'operationType'
})
export class OperationTypePipe implements PipeTransform {

    transform(string: any, args?: any): any {
        string = string.replace(/_/g, ' ');
        return (string.charAt(0).toUpperCase() + string.slice(1));
    }

}
