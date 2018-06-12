import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class InvestmentService {

    investmentUrl: string = URL_CONSTANTS.investment;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: Top up of authorized capital with cash
     * @param body
     * @returns {Promise<any>}
     */
    createInvestmentRequest(body) {
        return this.http.post(this.investmentUrl, body).toPromise<any>();
    }

    /**
     * GET: View cash investment details
     * @param id
     * @returns {Promise<any>}
     */
    viewInvestmentRequest(id) {
        return this.http.get(`${this.investmentUrl}/${id}`).toPromise<any>();
    }

    /**
     * POST: Accept investment request
     * @param id
     * @param {{}} body
     * @returns {Promise<any>}
     */
    acceptInvestmentRequest(id, body = {}) {
        return this.http.post(`${this.investmentUrl}/${id}/accept`, body).toPromise<any>();
    }

}
