import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_CONSTANTS} from '../app.url';

@Injectable()
export class CashDeskWithdrawalService {

    private cashDeskWithdrawalUrl: string = URL_CONSTANTS.cashDeskWithdrawal;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: Executes withdrawal via cash desk
     * @param cashDeskId
     * @param body
     * @returns {Promise<any>}
     */
    executeWithdrawal(cashDeskId, body) {
        return this.http.post(`${this.cashDeskWithdrawalUrl}/${cashDeskId}`, body).toPromise<any>();
    }

    /**
     * POST: Calculates commission for withdrawal via cash desk
     * @param cashDeskId
     * @param body
     * @returns {Promise<any>}
     */
    calculateCommissionForWithdrawal(cashDeskId, body) {
        return this.http.post(`${this.cashDeskWithdrawalUrl}/${cashDeskId}/calculate`, body).toPromise<any>();
    }

    /**
     * GET: View withdrawal request details
     * @param requestIdentifier
     * @returns {Promise<any>}
     */
    getWithdrawalRequest(requestIdentifier) {
        return this.http.get(`${this.cashDeskWithdrawalUrl}/details/${requestIdentifier}`).toPromise<any>();
    }

    /**
     * GET: View withdrawal requests for specified cash desk
     * @param cashDeskId
     * @returns {Promise<any>}
     */
    getWithdrawalRequestsForCashDesk(cashDeskId) {
        return this.http.get(`${this.cashDeskWithdrawalUrl}/${cashDeskId}`).toPromise<any>();
    }

    /**
     * POST: Accept withdrawal request
     * @param requestIdentifier
     * @returns {Promise<any>}
     */
    acceptWithdrawalRequest(requestIdentifier) {
        return this.http.post(`${this.cashDeskWithdrawalUrl}/${requestIdentifier}/accept`, {}).toPromise<any>();
    }

    /**
     * POST: Approve withdrawal request
     * @param requestIdentifier
     * @returns {Promise<any>}
     */
    approveWithdrawalRequest(requestIdentifier) {
        return this.http.post(`${this.cashDeskWithdrawalUrl}/${requestIdentifier}/approve`, {}).toPromise<any>();
    }
    /**
     * POST: Decline withdrawal request
     * @param requestIdentifier
     * @returns {Promise<any>}
     */
    declineWithdrawalRequest(requestIdentifier) {
        return this.http.post(`${this.cashDeskWithdrawalUrl}/${requestIdentifier}/decline`, {}).toPromise<any>();
    }
}
