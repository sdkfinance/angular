import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Issuer} from '../_interfaces/issuer';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class IssuersService {

    private issuersUrl = URL_CONSTANTS.issuers;
    private exchangeUrl = URL_CONSTANTS.exchange;
    private currenciesUrl = URL_CONSTANTS.currencies;

    _issuersSubject: BehaviorSubject<Issuer[]> = new BehaviorSubject(null);

    constructor(private http: HttpClient) {
    }

    getIssuers() {
        return this.http.get(this.issuersUrl).toPromise<any>();
    }

    createIssuer(body) {
        return this.http.post(this.issuersUrl, body).toPromise<any>();
    }

    updateIssuer(id, body) {
        return this.http.patch(`${this.issuersUrl}/${id}`, body).toPromise<any>();
    }

    getExchangers(body) {
        return this.http.post(`${this.exchangeUrl}/view`, body).toPromise<any>();
    }

    calculateCommission(rateId, body) {
        return this.http.post(`${this.exchangeUrl}/${rateId}/exchanges/calculate`, body).toPromise<any>();
    }

    executeExchangeOperation(rateId, body) {
        return this.http.post(`${this.exchangeUrl}/${rateId}/exchanges`, body).toPromise<any>();
    }

    getCurrencies() {
        return this.http.get(this.currenciesUrl).toPromise<any>();
    }

    getIssuersSubject() {
        return this._issuersSubject.asObservable();
    }

    setIssuersSubject(issuers: Issuer[]) {
        this._issuersSubject.next(issuers);
    }

    updateIssuersSubject() {
        this.getIssuers().then(data => this._issuersSubject.next(<Issuer[]>data.records)).catch();
    }
}
