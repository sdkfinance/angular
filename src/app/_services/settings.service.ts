import {Injectable} from '@angular/core';
import {Http, RequestOptions, Headers} from "@angular/http";
import {URL_CONSTANTS} from "../app.url";
import {Profile} from "../_classes/profile";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {I18nService} from './i18n.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class SettingsService {
    private settingsUrl: string = URL_CONSTANTS.settings;
    private settingsPerson: string = URL_CONSTANTS.settingsPerson;
    private documentsUrl: string = URL_CONSTANTS.profileDocuments;

    private settingsSubj: Subject<Profile> = new Subject();
    public settingsUpd: Observable<Profile> = this.settingsSubj.asObservable();

    private profile: Profile = null;

    constructor(private http: HttpClient, private i18n: I18nService) {
    }

    /**
     * Getting user profile
     * @returns {Promise<T>}
     */
    getProfile(): Promise<any> {
        return this.http.get(this.settingsUrl).map(this.mapProfilesResponse.bind(this)).toPromise();
    }

    mapProfilesResponse(response: Response) {
        let profile = response as any;
        /**
         * update profile with obs
         */
        this.setLocalProfile(profile);

        return new Profile(profile);
    }

    updateUserProfile(profile: Profile): Promise<any> {
        return this.http.patch(this.settingsPerson, JSON.stringify(profile.getBodyForUpdateUserName()))
            .map(this.mapProfilesResponse.bind(this))
            .toPromise();
    }

    updatePersonInformation(body): Promise<any> {
        return this.http.patch(this.settingsPerson, body)
            .map(this.mapProfilesResponse.bind(this))
            .toPromise();
    }

    updateSecuritySettings(body): Promise<any> {
        return this.http.patch(this.settingsUrl + '/security-settings', body)
            .map(this.mapProfilesResponse.bind(this))
            .toPromise();
    }

    updatePassword(body) {
        return this.http.patch(this.settingsUrl + '/password', body).toPromise<any>();
    }

    setLocalProfile(profile: any) {
        this.profile = new Profile(profile);
        this.settingsSubj.next(Object.assign({}, this.profile));
    }

    submitFile(body) {
        return this.http.post(this.documentsUrl, body).toPromise<any>();
    }

    getDocuments() {
        let headers = new HttpHeaders();
        headers.append('Accept-Language', this.i18n.getCurrentLocale().locale);
        let options = {headers: headers};
        return this.http.get(this.documentsUrl, options).toPromise<any>();
    }

    getDocumentTypes() {
        return this.http.post(this.documentsUrl + '/view-document-types', {}).toPromise<any>();
    }

    confirmContact(body) {
        return this.http.post(this.settingsUrl + '/contact', body).toPromise<any>();
    }

    resendCode(body) {
        return this.http.post(this.settingsUrl + '/contact/resend-otp', body).toPromise<any>();
    }

    confirmContactWithOtp(body) {
        return this.http.post(this.settingsUrl + '/contact/confirm', body).toPromise<any>();
    }

}
