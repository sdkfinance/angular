import {TOKEN_LS_NAME} from "../app.constants";

export class UserProfile {
    organizations: any[] = [];
    roles: any[] = ['anonym'];
    token: string;
    user: any = {};
    tokenExpiresAt: string;

    constructor(userProfile?: UserProfile) {
        //  this.roles = ['anonym'];
        if (userProfile) {
            Object.assign(this.organizations, userProfile.organizations);
            Object.assign(this.roles, userProfile.roles);
            this.token = userProfile.token;
        } else {
            this.getUserInformationFromString(localStorage.getItem(TOKEN_LS_NAME));
        }
        console.log(this.token);
    }


    getToken() {
        return this.token;
    }

    getRoles() {
        return this.roles;
    }

    updateInformationFromResponse(response: any) {
        /**
         * update current object
         */
        this.token = response.authorizationToken.token;
        this.tokenExpiresAt = response.authorizationToken.expiresAt;
        this.roles = [];
        this.organizations = [];
        this.user = {};
        if (response.members) {
            for (let member of response.members) {
                this.roles.push(member.role);
                this.organizations.push(member.organization);
            }
            Object.assign(this.user, response.members[0].user);
        }
    }

    getUserInformationFromString(profileString: string) {
        /**
         * fill user profile using localstorage
         */
        try {
            let tmp = JSON.parse(profileString);
            Object.assign(this.organizations, tmp.organizations);
            Object.assign(this.roles, tmp.roles);
            this.token = tmp.token;
            this.tokenExpiresAt = tmp.tokenExpiresAt;
            Object.assign(this.user, tmp.user);
        } catch (e) {
            console.log('Cant`t parse string');
        }
    }

    setUserInformationToLocalStorage(profileString: string) {
        localStorage.setItem(TOKEN_LS_NAME, profileString);
    }

    clearUserInformationFromLocalStorage() {
        localStorage.removeItem(TOKEN_LS_NAME);
        localStorage.removeItem('i18n');
        // localStorage.clear();
    }

    toJson(): string {
        /**
         * returns json parsed
         */
        return JSON.stringify({
            organizations: this.organizations,
            roles: this.roles,
            token: this.token,
            tokenExpiresAt: this.tokenExpiresAt,
            user: this.user
        });
    }

    hasRole(role: string): boolean {
        /**
         *  returns true if current user got such role
         */
        for (let iRole of this.roles) {
            if (iRole === role) {
                return true;
            }
        }

        return false;
    }
}
