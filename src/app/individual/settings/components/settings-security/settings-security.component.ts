import {Component, OnInit} from '@angular/core';
import {Profile} from '../../../../_classes/profile';
import {SettingsService} from '../../../../_services/settings.service';

@Component({
    selector: 'app-settings-security',
    templateUrl: './settings-security.component.html',
    styles: []
})
export class SettingsSecurityComponent implements OnInit {

    /** Current user profile */
    profile: Profile = null;
    /** Info about the user's security settings */
    security = null;
    waiting = false;

    constructor(private settingsService: SettingsService) {
    }

    ngOnInit() {
        this.getProfileFromHttp();
    }

    /**
     * Gets current user profile and sets security settings info
     */
    getProfileFromHttp() {
        this.settingsService.getProfile().then(profile => {
            this.profile = profile;
            this.security = this.profile.profile.security;
        }).catch(error => console.log(error));
    }

    /**
     * Make a request with new security setting
     */
    saveChanges() {
        this.waiting = true;
        this.settingsService.updateSecuritySettings({security: this.security})
            .then(profile => {
                this.waiting = false;
                this.profile = profile;
                this.security = this.profile.profile.security;
            }).catch(error => this.waiting = false);
    }
}
