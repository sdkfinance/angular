import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class StatisticService {
    newClientsUrl: string = URL_CONSTANTS.newClients;
    allUsersUrl: string = URL_CONSTANTS.allUsers;
    transactionViewUrl: string = URL_CONSTANTS.merchantPayments + '/view';

    constructor(private http: HttpClient) {
    }

    getNewClientsStat() {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        let options = {headers: headers};
        return this.http.post(this.newClientsUrl, options).toPromise<any>();
    }

    getAllUsers() {
        let headers = new HttpHeaders({'Content-Type': 'application/json'});
        let options = {headers: headers};
        return this.http.post(this.allUsersUrl, {}, options).toPromise<any>();
    }

    calcBonuses() {
        let headers = new HttpHeaders();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.transactionViewUrl, {}).toPromise<any>();
    }
}
