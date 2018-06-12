import {Component, OnInit} from '@angular/core';
import {UserManagementService} from '../../services/user-management.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TransliterationService} from "../../../../_services/transliteration.service";
import {ClientsService} from "../../../../_services/clients.service";

@Component({
    selector: 'app-user-details-edit',
    templateUrl: './user-details-edit.component.html',
    styles: []
})
export class UserDetailsEditComponent implements OnInit {

    /** The user profile for view */
    userProfile;
    /** The user's id */
    userId: string;

    /** Form with user name fields */
    userNameForm: FormGroup;
    waiting: boolean = false;

    /** List of possible errors */
    errors = {
        firstNameRequired: false,
        lastNameRequired: false,
        firstIntlRequired: false,
        lastIntlRequired: false,
        descriptionRequired: false
    };

    constructor(private userManagementService: UserManagementService, private clientsService: ClientsService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.createForm();
        this.getUserProfile();
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
            description: ['', Validators.required]
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

        this.userNameForm.get('description').valueChanges.subscribe(data => {
            this.errors.descriptionRequired = false;
        });
    }

    /**
     * Sets current name of user into form fields
     */
    saveCurrentProfileInfo() {
        this.userNameForm.get('firstName').setValue(this.userProfile.person.namePlain.first);
        this.userNameForm.get('middleName').setValue(this.userProfile.person.namePlain.middle);
        this.userNameForm.get('lastName').setValue(this.userProfile.person.namePlain.last);
        this.userNameForm.get('firstIntlName').setValue(this.userProfile.person.nameIntl.first);
        this.userNameForm.get('middleIntlName').setValue(this.userProfile.person.nameIntl.middle);
        this.userNameForm.get('lastIntlName').setValue(this.userProfile.person.nameIntl.last);
        this.userNameForm.get('description').setValue(this.userProfile.person.description);
    }

    /** Subscribes for getting the user profile */
    getUserProfile() {
        this.userManagementService.getUserProfileSubject().subscribe(data => {
            this.userProfile = data;
            if (this.userProfile) this.saveCurrentProfileInfo();
            this.userId = this.userManagementService.userId;
        });
    }

    /**
     * Checks errors and if there are no errors makes a request to change name
     */
    saveNameChanges() {
        if (this.userNameForm.get('firstName').hasError('required')) this.errors.firstNameRequired = true;
        if (this.userNameForm.get('lastName').hasError('required')) this.errors.lastNameRequired = true;
        if (this.userNameForm.get('firstIntlName').hasError('required')) this.errors.firstIntlRequired = true;
        if (this.userNameForm.get('description').hasError('required')) this.errors.descriptionRequired = true;

        if (!this.hasErrors()) {
            this.waiting = true;
            this.clientsService.updatePersonInfoById(this.userId, this.createRequestBody())
                .then(profile => {
                    this.waiting = false;
                    this.userManagementService.setUserProfileSubject(profile.profile);
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
                description: this.userNameForm.get('description').value
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
        if (type === 'last') this.userNameForm.get('lastIntlName')
            .setValue(TransliterationService.translit(this.userNameForm.get('lastName').value));
        else if (type === 'first') this.userNameForm.get('firstIntlName')
            .setValue(TransliterationService.translit(this.userNameForm.get('firstName').value));
        else if (type === 'middle') this.userNameForm.get('middleIntlName')
            .setValue(TransliterationService.translit(this.userNameForm.get('middleName').value));
    }

}
