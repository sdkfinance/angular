import {Component, OnInit} from '@angular/core';
import {Profile} from '../../../../_classes/profile';
import {SettingsService} from '../../../../_services/settings.service';
import {LOGO_LINK, LOGO_URL} from '../../../../app.constants';

@Component({
    selector: 'app-cfo-menu',
    templateUrl: './cfo-menu.component.html',
    styles: []
})
export class CfoMenuComponent implements OnInit {

    logoUrl = LOGO_URL;
    logoLink = LOGO_LINK;

    profile: Profile = null;

    menuIsHidden: boolean = true;

    constructor(private settingsService: SettingsService) {
        this.settingsService.getProfile().then((data) => {
            this.setProfile(data);
            this.settingsService.settingsUpd.subscribe(this.setProfile.bind(this));
        });
    }

    ngOnInit() {
    }

    setProfile(profile: Profile) {
        this.profile = new Profile(profile);
    }

    showMenu(event) {
        setTimeout(() => this.menuIsHidden = false, 2);
    }

    hideMenu() {
        this.menuIsHidden = true;
    }

}
