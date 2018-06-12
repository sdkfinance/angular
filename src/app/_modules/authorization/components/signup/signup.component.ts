import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../../_services/authorization.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {LOGIN_LOGO_URL, LOGO_LINK, LOGO_URL, PAGE_TITLES} from '../../../../app.constants';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.less']
})
export class SignupComponent implements OnInit {

    logoUrl = LOGIN_LOGO_URL;
    logoLink = LOGO_LINK;

    errorMessage: string = '';
    form: FormGroup;

    action = null;

    waiting: boolean = false;

    errors = {
        loginFormat: false,
        loginIsUsed: false,
        loginRequired: false
    };

    login = null;

    constructor(private fb: FormBuilder, private router: Router, private auth: AuthorizationService, private titleService: Title) {
        this.titleService.setTitle(PAGE_TITLES.login);
    }

    ngOnInit() {
        this.form = this.fb.group({
            login: '',
            role: 'individual',
            legalType: 'individual'
        });
    }


    onSignup() {
        if (this.form.get('login').value) {
            this.login = this.form.get('login').value[0] == '+' ? this.form.get('login').value.replace('+', '') : this.form.get('login').value;
            this.waiting = true;
            this.auth.registration({
                login: this.login,
                role: this.form.get('role').value,
                legalType: this.form.get('role').value == 'merchant' ? this.form.get('legalType').value : null
            }).then(response => {
                this.waiting = false;
                this.action = (<any>response).action;

            }).catch(error => {
                error = error.error;
                this.waiting = false;
                if (error.code == 'VALIDATION_FAILED') {
                    this.errors.loginFormat = true;
                    this.errorMessage = 'Incorrect contact format. Please try again.';
                }
                if (error.code == 'USER_ALREADY_EXISTS') {
                    this.errors.loginIsUsed = true;
                    this.errorMessage = 'This login is already in use.';
                }
            });
        } else {
            this.errors.loginRequired = true;
        }
    }

    resetErrors() {
        this.errors.loginFormat = false;
        this.errors.loginIsUsed = false;
        this.errors.loginRequired = false;
        this.errorMessage = null;
    }
}
