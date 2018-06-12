import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Profile} from '../../../../_classes/profile';
import {SettingsService} from '../../../../_services/settings.service';
import {TransliterationService} from '../../../../_services/transliteration.service';

@Component({
    selector: 'app-settings-user',
    templateUrl: './settings-user.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class SettingsUserComponent implements OnInit {

    /** Form with user name fields */
    userNameForm: FormGroup;
    /** Current user profile */
    profile: Profile = null;

    waiting: boolean = false;

    /** List of possible errors */
    errors = {
        firstNameRequired: false,
        lastNameRequired: false,
        firstIntlRequired: false,
        lastIntlRequired: false
    };

    constructor(private fb: FormBuilder, private settingsService: SettingsService) {
    }

    ngOnInit() {
        this.getProfileFromHttp();
        this.createForm();
    }

    /**
     * Creates form with FormBuilder
     */
    createForm() {
        this.userNameForm = this.fb.group({
            firstName: ['', Validators.required],
            middleName: [''],
            lastName: ['', Validators.required],
            firstIntlName: ['', Validators.required],
            middleIntlName: [''],
            lastIntlName: ['', Validators.required],
        });

        this.userNameForm.get('firstName').valueChanges.subscribe(data => {
            this.errors.firstNameRequired = false;
        });

        this.userNameForm.get('lastName').valueChanges.subscribe(data => {
            this.errors.lastNameRequired = false;
        });

        this.userNameForm.get('firstIntlName').valueChanges.subscribe(data => {
            this.errors.firstIntlRequired = false;
        });

        this.userNameForm.get('lastIntlName').valueChanges.subscribe(data => {
            this.errors.lastIntlRequired = false;
        });
    }

    /**
     * Sets current name of user into form fields
     */
    saveCurrentProfileInfo() {
        this.userNameForm.get('firstName').setValue(this.profile.profile.person.namePlain.first);
        this.userNameForm.get('middleName').setValue(this.profile.profile.person.namePlain.middle);
        this.userNameForm.get('lastName').setValue(this.profile.profile.person.namePlain.last);
        this.userNameForm.get('firstIntlName').setValue(this.profile.profile.person.nameIntl.first);
        this.userNameForm.get('middleIntlName').setValue(this.profile.profile.person.nameIntl.middle);
        this.userNameForm.get('lastIntlName').setValue(this.profile.profile.person.nameIntl.last);
    }

    /**
     * Gets current user profile
     */
    getProfileFromHttp() {
        this.settingsService.getProfile().then(profile => {
            this.profile = profile;
            this.saveCurrentProfileInfo();
        }).catch(error => console.log(error));
    }

    /**
     * Checks errors and if there are no errors makes request to change name
     */
    saveNameChanges() {
        if (this.userNameForm.get('firstName').hasError('required')) this.errors.firstNameRequired = true;
        if (this.userNameForm.get('lastName').hasError('required')) this.errors.lastNameRequired = true;
        if (this.userNameForm.get('firstIntlName').hasError('required')) this.errors.firstIntlRequired = true;
        if (this.userNameForm.get('lastIntlName').hasError('required')) this.errors.lastIntlRequired = true;

        if (!this.hasErrors()) {
            this.waiting = true;
            this.settingsService.updatePersonInformation(this.createRequestBody())
                .then(profile => {
                    this.waiting = false;
                    this.profile = profile;
                    this.saveCurrentProfileInfo();
                })
                .catch(error => this.waiting = false);
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

    /**
     * Builds object with user names
     * @returns body for request with user names
     */
    createRequestBody() {
        let body = {
            person: {
                namePlain: {
                    first: this.userNameForm.get('firstName').value,
                    last: this.userNameForm.get('lastName').value
                },
                nameIntl: {
                    first: this.userNameForm.get('firstIntlName').value,
                    last: this.userNameForm.get('lastIntlName').value
                },
                description: 'description'
            }
        };

        if (this.userNameForm.get('middleName').value) {
            body.person.namePlain['middle'] = this.userNameForm.get('middleName').value;
        }

        if (this.userNameForm.get('middleIntlName').value) {
            body.person.nameIntl['middle'] = this.userNameForm.get('middleIntlName').value;
        }

        return body;
    }

    /**
     * Transliterates user name and sets is into relevant fields
     * @param {string} type Type of transliterating name
     */
    transliterate(type: string) {
        if (this.profile.profile.status == 'approved') return;
        if (type === 'last') this.userNameForm.get('lastIntlName')
            .setValue(TransliterationService.translit(this.userNameForm.get('lastName').value));
        else if (type === 'first') this.userNameForm.get('firstIntlName')
            .setValue(TransliterationService.translit(this.userNameForm.get('firstName').value));
        else if (type === 'middle') this.userNameForm.get('middleIntlName')
            .setValue(TransliterationService.translit(this.userNameForm.get('middleName').value));
    }

}
