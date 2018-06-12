import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PrepaidService {

    private prepaidUrl: string = URL_CONSTANTS.prepaid;

    vouchersSubject: Subject<any> = new Subject();
    vouchersRequestBody;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: Creates a new voucher
     * @param body
     * @returns {Promise<any>}
     */
    createPrepaid(body) {
        return this.http.post(this.prepaidUrl, body).toPromise<any>();
    }

    /**
     * POST: Calculates commission for prepaid creation
     * @param body
     * @returns {Promise<any>}
     */
    calculateCommissionForCreation(body) {
        return this.http.post(`${this.prepaidUrl}/calculate`, body).toPromise<any>();
    }

    /**
     * POST: Calculates commission for redeem of the prepaid
     * @param body
     * @param serial
     * @returns {Promise<any>}
     */
    calculateCommissionForRedeem(body, serial) {
        return this.http.post(`${this.prepaidUrl}/${serial}/calculate`, body).toPromise<any>();
    }

    /**
     * POST: Activates prepaid coin
     * @param body
     * @param serial
     * @returns {Promise<any>}
     */
    redeemVoucher(body, serial) {
        return this.http.post(`${this.prepaidUrl}/${serial}/activate`, body).toPromise<any>();
    }

    /**
     *
     * @param {any} body
     * @returns {Promise<any>}
     */
    getVouchers(body) {
        return this.http.post(`${this.prepaidUrl}/view`, body).toPromise<any>();
    }

    updateVouchersList(body?) {
        this.vouchersRequestBody = body || this.vouchersRequestBody;
        this.getVouchers(this.vouchersRequestBody)
            .then(data => this.vouchersSubject.next(data))
            .catch(e => e);
    }

    getVouchersList() {
        return this.vouchersSubject.asObservable();
    }

}
