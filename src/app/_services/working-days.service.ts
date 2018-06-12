import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class WorkingDaysService {

    private workingDaysUrl: string = URL_CONSTANTS.workingDays;

    constructor(private http: HttpClient) {
    }

    /**
     * GET: View the current working day
     * @returns {Promise<any>}
     */
    getCurrentWorkingDay() {
        return this.http.get(`${this.workingDaysUrl}/current`).toPromise<any>();
    }

    /**
     * POST: Opens working day
     * @returns {Promise<any>}
     */
    openWorkingDay() {
        return this.http.post(`${this.workingDaysUrl}`, {}).toPromise<any>();
    }

    /**
     * POST: Sends request to close a working day
     * @returns {Promise<any>}
     */
    closeWorkingDay() {
        return this.http.post(`${this.workingDaysUrl}/request-closing`, {}).toPromise<any>();
    }

    /**
     * POST: Accepts closing of working day
     * @returns {Promise<any>}
     */
    acceptClosingWorkingDay() {
        return this.http.post(`${this.workingDaysUrl}/confirm-request-closing`, {}).toPromise<any>();
    }

}
