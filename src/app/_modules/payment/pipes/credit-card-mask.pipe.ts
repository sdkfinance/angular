import {Pipe, PipeTransform, WrappedValue} from '@angular/core';

@Pipe({
    name: 'creditCardMask'
})
export class CreditCardMaskPipe implements PipeTransform {
    transform(plainCreditCard: string): any {
        return WrappedValue.wrap(
            plainCreditCard
                .replace(/\D/g, '')
                .replace(/\s+/g, '')
                .replace(/(\d{4})/g, '$1 ')
                .trim()
        ).wrapped;
    }
}
