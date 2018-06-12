import {Pipe, PipeTransform} from '@angular/core';
import {TRANSACTION_STATUSES} from '../app.constants';

@Pipe({
    name: 'transactionStatus'
})
export class TransactionStatusPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return TRANSACTION_STATUSES[value] || value;
    }

}
