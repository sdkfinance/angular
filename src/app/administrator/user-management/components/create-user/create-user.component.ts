import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ORG_ROLES, ROLES} from '../../../../app.constants';
import {ClientsService} from '../../../../_services/clients.service';
import {AuthorizationService} from '../../../../_services/authorization.service';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styles: []
})
export class CreateUserComponent implements OnInit {

    form: FormGroup;

    roles = ROLES[this.auth.userProfile.roles[0]];
    showCheckbox: boolean = true;
    waiting: boolean = false;

    errors = {
        firstNameRequired: false,
        lastNameRequired: false,
        firstIntlRequired: false,
        lastIntlRequired: false,
        descriptionRequired: false,
        emailRequired: false,
        emailFormat: false,
        emailIsUsed: false,
        organizationIdRequired: false,
        organizationIdWrong: false,
        unknownError: false
    };

    constructor(private fb: FormBuilder, private clientsService: ClientsService,
                private auth: AuthorizationService) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            role: Object.keys(this.roles)[0],
            firstName: ['', Validators.required],
            middleName: [''],
            lastName: ['', Validators.required],
            firstIntlName: ['none', Validators.required],
            middleIntlName: [''],
            lastIntlName: ['none', Validators.required],
            description: ['', Validators.required],
            isLinkToOrg: [false],
            email: ['', [Validators.required, Validators.pattern(/^[\d\D]{1,}@[\d\D]{1,}$/)]],
            organizationId: ['']
        });

        this.form.get('isLinkToOrg').valueChanges.subscribe(data => {
            if (!data) {
                this.resetError('organizationIdRequired', 'organizationIdWrong');
            }
        });

        this.form.get('role').valueChanges.subscribe(data => {
            if (ORG_ROLES.indexOf(data) === -1) {
                this.showCheckbox = true;
                this.form.get('isLinkToOrg').setValue(false);
            } else {
                this.showCheckbox = false;
                this.form.get('isLinkToOrg').setValue(true);
            }
        });

        this.form.valueChanges.subscribe(data => {
            this.errors.unknownError = false;
        });
    }

    /**
     * Returns keys of system roles
     * @returns {string[]}
     */
    getRoleKeys(): string[] {
        return Object.keys(this.roles);
    }

    checkErrors(): boolean {
        if (this.form.controls['firstName'].hasError('required')) {
            this.errors.firstNameRequired = true;
        }
        if (this.form.controls['lastName'].hasError('required')) {
            this.errors.lastNameRequired = true;
        }
        if (this.form.controls['description'].hasError('required')) {
            this.errors.descriptionRequired = true;
        }
        if (this.form.controls['email'].hasError('required')) {
            this.errors.emailRequired = true;
        }
        if (this.form.controls['email'].hasError('pattern')) {
            this.errors.emailFormat = true;
        }
        if (this.form.controls['isLinkToOrg'].value && !this.form.controls['organizationId'].value.length) {
            this.errors.organizationIdRequired = true;
        }
        return !Object.keys(this.errors).find(key => this.errors[key]);
    }

    onCreate() {
        this.waiting = true;
        if (this.checkErrors()) {
            this.clientsService.createUser(this.createRegistrationInfoBody()).then(data => {
                const id = data.user.id;
                this.clientsService.updatePersonInfoById(id, this.createPersonInfoBody()).then(() => {
                    this.form.reset({
                        role: Object.keys(this.roles)[0],
                        firstIntlName: 'none',
                        lastIntlName: 'none',
                        isLinkToOrg: false
                    });
                    this.waiting = false;
                }).catch(() => this.waiting = false);
            }).catch(error => {
                error = error.error;
                if (error.code === 'ORGANIZATION_NOT_FOUND') {
                    this.errors.organizationIdWrong = true;
                } else if (error.code === '') {
                    this.errors.emailIsUsed = true;
                } else {
                    this.errors.unknownError = true;
                }
                this.waiting = false;
            });
        } else {
            this.waiting = false;
        }
    }

    resetError(...errors: string[]) {
        errors.forEach(error => this.errors[error] = false);
    }

    createPersonInfoBody() {
        let body = {
            person: {
                namePlain: {
                    first: this.form.get('firstName').value,
                    last: this.form.get('lastName').value
                },
                nameIntl: {
                    first: this.form.get('firstIntlName').value,
                    last: this.form.get('lastIntlName').value
                },
                description: this.form.get('description').value
            }
        };
        if (this.form.get('middleName').value) {
            body.person.namePlain['middle'] = this.form.get('middleName').value;
        }
        return body;
    }

    createRegistrationInfoBody() {
        let body = {
            login: this.form.get('email').value,
            role: this.form.get('role').value
        };
        if (this.form.get('isLinkToOrg').value) {
            body['organizationId'] = this.form.get('organizationId').value;
        }
        return body;
    }
}
