import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'paymentOptions'
})
export class PaymentOptionsPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        switch (value) {
            case 'new_card':
                return 'page.individual.payment_options.new_card';
            case  'existing_card':
                return 'page.individual.payment_options.existing_card';
            default:
                return '';
        }
    }

}
