import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ContractsService {

    private contractsUrl: string = URL_CONSTANTS.contracts;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: Obtains contracts matching the specified criteria
     * @param body - Criteria
     * @returns {Promise<any>}
     */
    getContracts(body) {
        return this.http.post(`${this.contractsUrl}/view`, body).toPromise<any>();
    }

    /**
     * GET: Obtains commission profiles for specified contract
     * @param {string} id - Contract id
     * @returns {Promise<any>}
     */
    getCommissionProfilesForContract(id: string) {
        return this.http.get(`${this.contractsUrl}/${id}/commission-profiles`).toPromise<any>();
    }

    /**
     * GET: Obtains limit profiles for specified commission profile
     * @param {string} contractId - Contract id
     * @param {string} profileId - Commission profile id
     * @returns {Promise<any>}
     */
    getLimitProfilesForCommissionProfile(contractId: string, profileId: string) {
        return this.http.get(`${this.contractsUrl}/${contractId}/commission-profiles/${profileId}/limit-profiles`).toPromise<any>();
    }

    /**
     * POST: Creates a new limit profile
     * @param {string} contractId - Contract id
     * @param {string} profileId - Commission profile id
     * @param body
     * @returns {Promise<any>}
     */
    createLimitProfile(contractId: string, profileId: string, body) {
        return this.http.post(`${this.contractsUrl}/${contractId}/commission-profiles/${profileId}/limit-profiles`, body).toPromise<any>();
    }

    /**
     * PATCH: Updates an existing limit profile
     * @param {string} contractId - Contract id
     * @param {string} commissionProfileId - Commission profile id
     * @param {string} profileId - Limit profile id
     * @param body
     * @returns {Promise<any>}
     */
    updateLimitProfile(contractId: string, commissionProfileId: string, profileId: string, body) {
        return this.http
            .patch(`${this.contractsUrl}/${contractId}/commission-profiles/${commissionProfileId}/limit-profiles/${profileId}`, body)
            .toPromise<any>();
    }

    /**
     * PATCH: Updates an existing commission profile
     * @param {string} contractId - Contract id
     * @param {string} commissionProfileId - Commission profile id
     * @param body
     * @returns {Promise<any>}
     */
    updateCommissionProfile(contractId: string, commissionProfileId: string, body) {
        return this.http.patch(`${this.contractsUrl}/${contractId}/commission-profiles/${commissionProfileId}`, body).toPromise<any>();
    }

}
