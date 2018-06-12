import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ContractsGateService {

    private contractsUrl: string = URL_CONSTANTS.contracts;

    constructor(private http: HttpClient) {
    }

    /**
     * GET: Views gate commission profiles for specified contract
     * @param {string} contractId - Contract id
     * @returns {Promise<any>}
     */
    getGateCommissionProfiles(contractId: string) {
        return this.http.get(`${this.contractsUrl}/${contractId}/gate-commission-profiles`)
            .toPromise<any>();
    }

    /**
     * GET: Views gate commission profile with its id
     * @param {string} contractId - Contract id
     * @param {string} profileId - Gate commission profile id
     * @returns {Promise<any>}
     */
    getGateCommissionProfileById(contractId: string, profileId: string) {
        return this.http.get(`${this.contractsUrl}/${contractId}/gate-commission-profiles/${profileId}`)
            .toPromise<any>();
    }

    /**
     * POST: Creates a new gate commission profile
     * @param {string} contractId - Contract id
     * @param body
     * @returns {Promise<any>}
     */
    createGateCommissionProfiles(contractId: string, body) {
        return this.http.post(`${this.contractsUrl}/${contractId}/gate-commission-profiles`, body)
            .toPromise<any>();
    }

    /**
     * GET: Views commission settings of gate commission profile
     * @param {string} contractId - Contract id
     * @param {string} profileId - Gate commission profile
     * @returns {Promise<any>}
     */
    getGateCommissionProfileSettings(contractId: string, profileId: string) {
        return this.http
            .get(`${this.contractsUrl}/${contractId}/gate-commission-profiles/${profileId}/commission-settings-records`)
            .toPromise<any>();
    }

    /**
     * POST: Sets up a commission settings
     * @param {string} contractId
     * @param {string} profileId
     * @param body
     * @returns {Promise<any>}
     */
    setUpCommissionSetting(contractId: string, profileId: string, body) {
        return this.http
            .post(`${this.contractsUrl}/${contractId}/gate-commission-profiles/${profileId}/commission-settings-records/set-up-commission-settings`, body)
            .toPromise<any>();
    }

    /**
     * GET: Obtains gate limit profiles for specified gate commission profile
     * @param {string} contractId - Contract id
     * @param {string} profileId - Gate commission profile
     * @returns {Promise<any>}
     */
    getLimitProfilesOfGateCommissionProfile(contractId: string, profileId: string) {
        return this.http
            .get(`${this.contractsUrl}/${contractId}/gate-commission-profiles/${profileId}/limit-profiles`)
            .toPromise<any>();
    }

    /**
     * POST: Creates a new gate limit profile
     * @param {string} contractId
     * @param {string} profileId
     * @param body
     * @returns {Promise<any>}
     */
    createLimitProfile(contractId: string, profileId: string, body) {
        return this.http
            .post(`${this.contractsUrl}/${contractId}/gate-commission-profiles/${profileId}/limit-profiles`, body)
            .toPromise<any>();
    }

    /**
     * PATCH: Updates an existing limit profile
     * @param {string} contractId
     * @param {string} profileId
     * @param {string} limitProfileId
     * @param body
     * @returns {Promise<any>}
     */
    updateLimitProfile(contractId: string, profileId: string, limitProfileId: string, body) {
        return this.http
            .patch(`${this.contractsUrl}/${contractId}/gate-commission-profiles/${profileId}/limit-profiles/${limitProfileId}`, body)
            .toPromise<any>();
    }

    /**
     * GET: Views product commission settings of gate commission profile
     * @param {string} contractId
     * @param {string} profileId
     * @returns {Promise<any>}
     */
    getProductCommissionSettings(contractId: string, profileId: string) {
        return this.http
            .get(`${this.contractsUrl}/${contractId}/gate-commission-profiles/${profileId}/product-commission-settings-records`)
            .toPromise<any>();
    }

    /**
     * POST: Sets up a product commission settings
     * @param {string} contractId
     * @param {string} profileId
     * @param body
     * @returns {Promise<any>}
     */
    setUpProductCommissionSettings(contractId: string, profileId: string, body) {
        return this.http
            .post(`${this.contractsUrl}/${contractId}/gate-commission-profiles/${profileId}/product-commission-settings-records/set-up-product-commission-settings`, body)
            .toPromise<any>();
    }

}
