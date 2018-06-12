import {Component, OnInit} from '@angular/core';
import {Profile} from '../../../../_classes/profile';
import {SettingsService} from '../../../../_services/settings.service';
import {LOGO_LINK, LOGO_URL} from '../../../../app.constants';

@Component({
    selector: 'app-individual-menu',
    templateUrl: './individual-menu.component.html',
    styles: []
})
export class IndividualMenuComponent implements OnInit {

    logoUrl = LOGO_URL;
    logoLink = LOGO_LINK;

    profile: Profile = null;
    storage = JSON.parse(localStorage.getItem('sdk.finance_common_token'));
    isAdmin: boolean = false;

    menuIsHidden: boolean = true;

    constructor(private settingsService: SettingsService) {
        this.settingsService.getProfile().then((data) => {
            this.setProfile(data);
            this.settingsService.settingsUpd.subscribe(this.setProfile.bind(this));
        });
        this.setIsAdmin(this.storage.roles);
    }

    ngOnInit() {
    }

    setProfile(profile: Profile) {
        this.profile = new Profile(profile);
    }

    setIsAdmin(array) {
        for (let item of array) {
            if (item === 'administrator') {
                this.isAdmin = true;
            }
        }
    }

    showMenu(event) {
        setTimeout(() => this.menuIsHidden = false, 2);
    }

    hideMenu() {
        this.menuIsHidden = true;
    }

}
