import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {LOGIN_LOGO_URL, LOGO_LINK, PAGE_TITLES} from '../../../../app.constants';
import {AuthorizationService} from '../../../../_services/authorization.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styles: []
})
export class ResetPasswordComponent implements OnInit {

    logoUrl = LOGIN_LOGO_URL;
    logoLink = LOGO_LINK;

    resetPassForm: FormGroup;
    isSent: boolean = false;
    submitted = false;

    action;

    constructor(private fb: FormBuilder, private auth: AuthorizationService, private titleService: Title) {
        this.isSent = false;
        this.titleService.setTitle(PAGE_TITLES.resetPass);

        this.resetPassForm = this.fb.group({
            resetLogin: [null, [Validators.required]]
        });
    }

    ngOnInit() {
    }

    onResetPass() {
        this.submitted = true;
        if (this.resetPassForm.valid) {
            this.auth.resetPass({
                'login': this.resetPassForm.get('resetLogin').value.toLowerCase()
            }).then(response => {
                this.action = response.action;
                if (response.status === 'ok') {
                    this.setIsSent(true);
                } else {
                    this.setIsSent(false);
                }
            }).catch(e => e);
        }
    }

    setIsSent(flag: boolean) {
        this.isSent = flag;
    }

}
