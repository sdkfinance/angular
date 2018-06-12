import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'documentStatus'
})
export class DocumentStatusPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        switch (value) {
            case 'PENDING':
                return 'page.individual.docs.pending';
            case 'APPROVED':
                return 'page.individual.docs.confirmed';
            case 'DECLINED':
                return 'page.individual.docs.declined';
            default:
                return '';
        }
    }

}
