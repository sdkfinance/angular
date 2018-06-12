import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../../_services/authorization.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {LOGIN_LOGO_URL, LOGO_LINK, LOGO_URL, PAGE_TITLES} from '../../../../app.constants';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    logoUrl = LOGIN_LOGO_URL;
    logoLink = LOGO_LINK;

    loginForm: FormGroup;

    waiting: boolean = false;

    errors = {
        'login.required': false,
        'pass.required': false,
        'incorrect': false
    };

    constructor(private fb: FormBuilder, private router: Router, private auth: AuthorizationService, private titleService: Title) {
        this.titleService.setTitle(PAGE_TITLES.login);
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.loginForm = this.fb.group({
            login: ['', [
                Validators.required
            ]],
            pass: ['', Validators.required]
        });
    }

    /**
     * Makes a request to log in the user
     */
    onLogin() {
        if (this.checkErrors()) {
            this.waiting = true;
            // get login ang pass from form
            let loginData = {
                'login': this.loginForm.get('login').value.toLowerCase(),
                'password': this.loginForm.get('pass').value
            };

            this.auth.authUser(loginData).then(response => {
                this.waiting = false;
            }).catch(error => {
                this.waiting = false;
                this.errors['incorrect'] = true;
            });
        }
    }

    /**
     * Returns true if there are no errors and sets found errors
     * @returns {boolean}
     */
    checkErrors() {
        for (let control in this.loginForm.controls) {
            if (this.loginForm.get(control).hasError('required')) {
                this.errors[`${control}.required`] = true;
            }
        }

        return Object.keys(this.errors).every(eKey => !this.errors[eKey]);
    }

    /**
     * Reset specified errors
     * @param {string} errors
     */
    resetErrors(...errors: string[]) {
        errors.forEach(error => this.errors[error] = false);
    }
}
