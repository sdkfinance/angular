import {Pipe, PipeTransform} from '@angular/core';
import {TRANSACTION_TYPES} from '../app.constants';

@Pipe({
    name: 'transactionType'
})
export class TransactionTypePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return TRANSACTION_TYPES[value] || value;
    }

}
