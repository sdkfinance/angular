import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {PaymentProvider} from '../../../_interfaces/payment-provider';
import {GatesService} from '../../../_services/gates.service';

@Injectable()
export class TopUpService {

    /** List of providers stored as subject */
    private providersSubject: BehaviorSubject<PaymentProvider[]> = new BehaviorSubject(null);
    /** Serial of the coin for which we gets providers */
    private serial;

    constructor(private gatesService: GatesService) {
    }

    /**
     * Makes a request to get providers and sends them to subject
     * @param serial
     */
    private getProviders(serial) {
        this.gatesService.getProviders({
            txType: 'TOPUP',
            serial: serial
        }).then(data => {
            this.providersSubject.next(data.records as PaymentProvider[]);
        }).catch();
    }

    /**
     * Returns the providers list as observable
     * @param serial
     * @returns {Observable<PaymentProvider[]>}
     */
    getProvidersSubject(serial) {
        if (!this.providersSubject.getValue() || serial !== this.serial) {
            this.providersSubject.next(null);
            this.serial = serial;
            this.getProviders(serial);
        }
        return this.providersSubject.asObservable();
    }

}
