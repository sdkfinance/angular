import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {LOCAL} from '../app.constants';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class TransactionService {
    private transactionUrl: string = URL_CONSTANTS.merchantPayments;
    private transactionViewerUrl: string = URL_CONSTANTS.transactions + '/view';
    private bonusesUrl: string = URL_CONSTANTS.bonuses;
    public totalRecords: number = null;
    private transactionsSubject: Subject<any> = new Subject();
    public lastBody: any = null;
    public position: number = null;
    public storage = null;

    constructor(private http: HttpClient) {

    }

    getTransactions() {
        return this.transactionsSubject.asObservable();
    }

    updateTransactions(body?: any) {
        if (body) {
            this.lastBody = body;
        }
        this.getTransView(this.lastBody).then(data => {
            this.transactionsSubject.next(data);
            // if (this.position) window.scrollTo(0, this.position);
        }).catch();
    }


    getTransactionList(body): Promise<any> {
        return this.http.post(`${this.transactionUrl}/view`, body).toPromise<any>();
        // .map(this.mapTransaction.bind(this))
    }

    getAdminTransactionList() {
        return this.http.post(`${this.transactionViewerUrl}`, {
            filter: {
                types: ['merchant_payment']
            },
            pageNumber: 0,
            pageSize: 20
        }).map((data) => data as any).map(this.mapAdminTransaction.bind(this)).toPromise();
    }

    getTransactionPurchases(identifier) {
        let headers = new HttpHeaders();
        let options = {headers: headers};
        headers.append('Accept-Language', LOCAL);
        return this.http.get(`${this.transactionUrl}/${identifier}/merchant-purchases?`, options).map((data) => data as any).map(this.mapTransactionPurchases.bind(this)).toPromise();
    }

    mapAdminTransaction(data) {
        let result = [];
        if (data.status === 'ok') {
            for (let transElement of data.records) {
                result.push(transElement);
            }
            /*this.transListUpdater.next(result);*/
            return result;
        }
    }

    mapTransactionPurchases(data) {
        let result = [];
        if (data.status === 'ok') {
            for (let transElement of data.records) {
                result.push(transElement);
            }
            /*this.transListUpdater.next(result);*/
            return result;

        }
    }

    getBonuses(id) {
        let headers = new HttpHeaders();
        let options = {headers: headers};
        headers.append('Accept-Language', LOCAL);
        return this.http.get(`${this.transactionUrl}/${id}/loyalty-rule-activations`, options).toPromise<any>();
    }

    getTransView(body) {
        return this.http.post(`${this.transactionViewerUrl}`, body).toPromise<any>();
    }


}
