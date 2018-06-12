import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../../../_services/settings.service';
import {AuthorizationService} from '../../../../_services/authorization.service';

@Component({
    selector: 'app-settings-password',
    templateUrl: './settings-password.component.html',
    styles: []
})
export class SettingsPasswordComponent implements OnInit {

    /** Data from current password field */
    currentPassword: string = '';
    /** Data from new password field */
    newPassword: string = '';
    /** Data from confirmation new password field */
    confirmPassword: string = '';
    waiting: boolean = false;

    /** List of possible errors */
    errors = {
        currentRequired: false,
        newRequired: false,
        confirmRequired: false,
        notTheSame: false,
        wrongCurrent: false,
        format: false
    };

    constructor(private settingsService: SettingsService, private authorizationService: AuthorizationService) {
    }

    ngOnInit() {
    }

    /**
     * Checks field for errors and if there are no errors
     * makes request to change password
     */
    onChange() {
        if (!this.currentPassword) this.errors.currentRequired = true;
        if (!this.newPassword) this.errors.newRequired = true;
        if (!this.confirmPassword) this.errors.confirmRequired = true;
        if (this.newPassword !== this.confirmPassword) this.errors.notTheSame = true;

        if (!this.hasErrors()) {
            this.waiting = true;
            this.settingsService.updatePassword({
                'currentUserPassword': this.currentPassword,
                'newUserPassword': this.newPassword
            }).then(response => {
                this.waiting = false;
                this.authorizationService.userProfile.updateInformationFromResponse(response);
                this.authorizationService.userProfile.setUserInformationToLocalStorage(this.authorizationService.userProfile.toJson());
                this.currentPassword = '';
                this.newPassword = '';
                this.confirmPassword = '';
            }).catch(error => {
                this.waiting = false;
                error = error.error;
                if (error.code == 'INVALID_CURRENT_PASSWORD') this.errors.wrongCurrent = true;
                if (error.code == 'VALIDATION_FAILED') this.errors.format = true;
            });
        }

    }

    /**
     * Returns true if there is at least one error
     * @returns {boolean}
     */
    hasErrors() {
        for (let key in this.errors) {
            if (this.errors[key]) return true;
        }
        return false;
    }

}
