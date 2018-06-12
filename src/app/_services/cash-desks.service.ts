import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CashDesksService {

    cashDesksUrl: string = URL_CONSTANTS.cashDesks;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: Gets cash desks for specified coin
     * @param body
     * @returns {Promise<any>}
     */
    getCashDeskForCoin(body) {
        return this.http.post(`${this.cashDesksUrl}/view`, body).toPromise<any>();
    }

}
