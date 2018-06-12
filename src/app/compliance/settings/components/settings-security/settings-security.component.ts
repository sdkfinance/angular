import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Profile} from "../../../../_classes/profile";
import {SettingsService} from "../../../../_services/settings.service";

@Component({
    selector: 'app-settings-security',
    templateUrl: './settings-security.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class SettingsSecurityComponent implements OnInit {

    /** Current user profile */
    profile: Profile = null;

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
        }).catch(error => console.log(error));
    }
}
