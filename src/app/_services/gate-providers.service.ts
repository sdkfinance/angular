import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GateProvidersService {

    private gateUrl: string = URL_CONSTANTS.gateProviders;

    constructor(private http: HttpClient) {
    }

    /**
     * GET: View provider accounts
     * @returns {Promise<any>}
     */
    getProviders() {
        return this.http.get(this.gateUrl).toPromise<any>();
    }

}
