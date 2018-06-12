import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProfileIdentificationService {

    private identificationUrl: string = URL_CONSTANTS.profiles;

    constructor(protected http: HttpClient) {
    }

    /**
     * POST: Approves organization's identification
     * @param userId - User id
     * @param {{}} body
     * @returns {Promise<any>}
     */
    approveIdentification(userId, body = {}) {
        return this.http.post(`${this.identificationUrl}/${userId}/approve`, body).toPromise<any>();
    }

    /**
     * POST: Declines organization's identification
     * @param userId  - User id
     * @param {{}} body
     * @returns {Promise<any>}
     */
    declineIdentification(userId, body = {}) {
        return this.http.post(`${this.identificationUrl}/${userId}/decline`, body).toPromise<any>();
    }

}
