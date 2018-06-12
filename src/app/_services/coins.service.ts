import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Coin} from '../_classes/coin';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CoinsService {
    private coinsUrl = URL_CONSTANTS.coins;
    /** Coins subject */
    private coinsSubject: Subject<any> = new Subject();
    /** A list of coins */
    coins: Coin[];

    constructor(private http: HttpClient) {
    }

    /**
     * GET: Get coins owned by current user
     * @returns {Promise<any>}
     */
    getCoins() {
        return this.http.get(this.coinsUrl).toPromise<any>();
    }

    /**
     * POST: Create coin
     * @param body
     * @returns {Promise<any>}
     */
    createCoin(body) {
        return this.http.post(this.coinsUrl, body).toPromise<any>();
    }

    /**
     * DELETE: Delete coin
     * @param serial
     * @returns {Promise<any>}
     */
    deleteCoin(serial) {
        return this.http.delete(`${this.coinsUrl}/${serial}`).toPromise<any>();
    }

    /**
     * PATCH: Update an existing coin
     * @param serial
     * @param body
     * @returns {Promise<any>}
     */
    updateCoin(serial, body) {
        return this.http.patch(`${this.coinsUrl}/${serial}`, body).toPromise<any>();
    }

    /**
     * POST: Set coin as main
     * @param body
     * @returns {Promise<any>}
     */
    setCoinAsMain(body) {
        return this.http.post(`${this.coinsUrl}/set-main`, body).toPromise<any>();
    }

    /**
     * POST: Validate a coin
     * @param body
     * @returns {Promise<any>}
     */
    validateCoin(body) {
        return this.http.post(`${this.coinsUrl}/validate`, body).toPromise<any>();
    }

    /**
     * Returns coins subject as observable
     * @returns {Observable<any>}
     */
    getCoinsList() {
        return this.coinsSubject.asObservable();
    }

    /**
     * Gets a new list of coins and updates subject
     */
    updateCoinsList() {
        this.getCoins().then(data => {
            this.coinsSubject.next(data);
            this.coins = data.coins;
        }).catch(e => e);
    }

}
