import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_CONSTANTS} from '../app.url';

@Injectable()
export class CashDeskTopUpService {

    private cashDeskTopUpUrl: string = URL_CONSTANTS.cashDeskTopUp;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: Top up a coin via cash desk
     * @param body
     * @returns {Promise<any>}
     */
    topUpCoin(body) {
        return this.http.post(`${this.cashDeskTopUpUrl}`, body).toPromise<any>();
    }

    /**
     * POST: Calculate commission for top-up via cash desk
     * @param body
     * @returns {Promise<any>}
     */
    calculateCommissionForTopUp(body) {
        return this.http.post(`${this.cashDeskTopUpUrl}/calculate`, body).toPromise<any>();
    }

}
