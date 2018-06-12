import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import {PAYMENT_TYPES} from '../shared/payment-types';

@Injectable()
export class PaymentTypeService {
    private type = new Subject<string>();

    public type$ = this.type.asObservable();

    constructor() {
    }

    public setType(typeKey: string): void {
        this.type.next(PAYMENT_TYPES[typeKey]);
    }
}
