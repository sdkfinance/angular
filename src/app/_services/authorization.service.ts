import {Injectable} from '@angular/core';
import {UserProfile} from '../_classes/user-profile';
import {URL_CONSTANTS} from '../app.url';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthorizationService {
    /** The user profile */
    public userProfile: UserProfile;
    /** Used URLs */
    private authUrl: string = URL_CONSTANTS.authorization;
    private resetPassUrl: string = URL_CONSTANTS.resetPass;
    private registrationUrl: string = URL_CONSTANTS.registration;
    /** The user's roles */
    role: any;

    constructor(private http: HttpClient, private router: Router) {
        this.userProfile = new UserProfile();
        if (this.userProfile.tokenExpiresAt && new Date(this.userProfile.tokenExpiresAt) < new Date()) {
            this.logoutUser();
        }

        console.log('auth init');
    }

    /**
     * Deletes the user profile from local storage and navigates to login page
     */
    logoutUser() {
        this.userProfile.clearUserInformationFromLocalStorage();
        this.userProfile = new UserProfile();
        this.router.navigate(['auth/login']);
    }

    /**
     * POST: authorizes the user
     * @param login Object that contains login and password
     * @returns {Promise<any>}
     */
    authUser(login): Promise<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers };
        return this.http.post(this.authUrl, JSON.stringify(login), options).map(this.mapAuthResponse.bind(this)).toPromise();
    }

    /**
     * POST: resets password
     * @param login
     * @returns {Promise<any>}
     */
    resetPass(login): Promise<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const options = { headers: headers };
        return this.http.post(this.resetPassUrl, JSON.stringify(login), options).toPromise();
    }


    /**
     * Parses response, sets it in local storage and then navigates to office corresponding to the user's role
     * @param {Response} response Authorisation response
     * @returns {Response}
     */
    mapAuthResponse(response: Response) {
        this.userProfile.updateInformationFromResponse(response);
        this.userProfile.setUserInformationToLocalStorage(this.userProfile.toJson());

        this.role = response;

        if (this.hasRole(this.role.members, 'administrator')) {
            this.router.navigate(['administrator']);
        } else if (this.hasRole(this.role.members, 'individual')) {
            this.router.navigate(['individual']);
        } else if (this.hasRole(this.role.members, 'merchant')) {
            this.router.navigate(['merchant']);
        } else if (this.hasRole(this.role.members, 'compliance_specialist')) {
            this.router.navigate(['compliance']);
        } else if (this.hasRole(this.role.members, 'cfo')) {
            this.router.navigate(['cfo']);
        } else if (this.hasRole(this.role.members, 'accountant')) {
            this.router.navigate(['accountant']);
        } else if (this.hasRole(this.role.members, 'cashier')) {
            this.router.navigate(['cashier']);
        }
        return response;
    }

    /**
     * Returns True if user has this role
     * @param {any[]} array Organizations membership
     * @param {String} role Role
     * @returns {boolean}
     */
    hasRole(array: any[], role: String): boolean {
        let result = false;
        for (let item of array) {
            if (item.role === role) {
                result = true;
            }
        }
        return result;
    }

    /**
     * POST: registers the user
     * @param body - Object with data necessary for registration
     * @returns {Promise<any>}
     */
    registration(body) {
        return this.http.post(this.registrationUrl, body).toPromise();
    }

    /**
     * POST: resents OTP
     * @param body
     * @returns {Promise<any>}
     */
    resendOtp(body) {
        return this.http.post(`${this.registrationUrl}/resend-otp`, body).toPromise();
    }

    /**
     * POST: confirms OTP
     * @param body
     * @returns {Promise<any>}
     */
    confirmWithOtp(body) {
        return this.http.post(`${this.registrationUrl}/confirm`, body).map(this.mapAuthResponse.bind(this)).toPromise();
    }

}
