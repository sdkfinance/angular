import {Injectable} from '@angular/core';
import {Coin} from '../_classes/coin';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class WithdrawalService {

    private withdrawalUrl: string = URL_CONSTANTS.bankWithdrawal;
    coins: Coin[];

    constructor(private http: HttpClient) {
    }

    setCoins(coins: Coin[]) {
        this.coins = coins;
    }

    getCoins(): Coin[] {
        return this.coins;
    }

    calculateCommissionForWithdrawalViaBank(body) {
        return this.http.post(this.withdrawalUrl + '/calculate', body).toPromise<any>();
    }

    performWithdrawalViaBank(body) {
        return this.http.post(this.withdrawalUrl, body).toPromise<any>();
    }

}
