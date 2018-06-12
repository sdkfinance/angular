import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class OrganizationsService {

    organizationsUrl: string = URL_CONSTANTS.organizations;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: Views organizations
     * @param body - filters
     * @returns {Promise<any>}
     */
    getOrganizations(body) {
        return this.http.post(this.organizationsUrl, body).toPromise<any>();
    }


    /**
     * GET: Views coins for organization
     * @param id - organization id
     * @returns {Promise<any>}
     */
    getCoinsForOrganization(id) {
        return this.http.get(`${this.organizationsUrl}/${id}/coins`).toPromise<any>();
    }

    /**
     * GET: Views provider coins of organization
     * @param id
     * @returns {Promise<any>}
     */
    getProviderCoins(id) {
        return this.http.get(`${this.organizationsUrl}/${id}/provider-coins`).toPromise<any>();
    }

}
