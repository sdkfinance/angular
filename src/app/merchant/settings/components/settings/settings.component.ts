import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SettingsService} from "../../../../_services/settings.service";
import {Profile} from "../../../../_classes/profile";
import {Title} from "@angular/platform-browser";
import {PAGE_TITLES, WINDOW_TITLE} from "../../../../app.constants";
import {TitleService} from "../../../../_services/title.service";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styles: []
})
export class SettingsComponent implements OnInit {
    settingsForm: FormGroup;
    profile: Profile = null;

    currentProfile: {
        firstName?,
        middleName?,
        lastName?,
        email?,
        phoneNumber?
    };

    constructor(private fb: FormBuilder, private settingsService: SettingsService, private titleService: Title) {
        this.titleService.setTitle(PAGE_TITLES.settings);
        TitleService.setTitle(WINDOW_TITLE.settings);
    }

    ngOnInit() {
        this.getProfileFromHttp();
        this.createForm();
        this.currentProfile = {};
    }

    createForm() {
        this.settingsForm = this.fb.group({
            profileNameFirst: ["", Validators.required],
            profileNameMiddle: [""],
            profileNameLast: [""],
            profileEmail: [""],
            profilePhoneNumber: [""]
        });
    }

    saveCurrentProfileInfo() {
        this.currentProfile.firstName = this.profile.profile.person.namePlain.first;
        this.currentProfile.middleName = this.profile.profile.person.namePlain.middle;
        this.currentProfile.lastName = this.profile.profile.person.namePlain.last;
        this.currentProfile.email = this.profile.profile.contact.email;
        this.currentProfile.phoneNumber = this.profile.profile.contact.phoneNumber;
    }


    getProfileFromHttp() {
        this.settingsService.getProfile().then(profile => {
            this.profile = profile;
            this.saveCurrentProfileInfo();
        })
            .catch(error => console.log(error));
    }

    saveNameChanges() {
        this.settingsService.updateUserProfile(this.profile)
            .then(profile => {
                this.profile = profile;
                this.saveCurrentProfileInfo();
            })
            .catch(error => console.log(error));
    }
}
