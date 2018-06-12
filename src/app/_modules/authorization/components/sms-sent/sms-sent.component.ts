import {Component, Input, OnInit} from '@angular/core';
import {AuthorizationService} from "../../../../_services/authorization.service";

@Component({
    selector: 'app-sms-sent',
    templateUrl: './sms-sent.component.html',
    styles: []
})
export class SmsSentComponent implements OnInit {

    @Input() phone;

    codeResent = false;
    code;
    wrongCode = false;
    waiting = false;

    constructor(private auth: AuthorizationService) {
    }

    ngOnInit() {
    }

    resendCode() {
        this.codeResent = false;
        this.auth.resendOtp({
            login: this.phone
        }).then(() => {
            this.codeResent = true;

        }).catch();
    }

    confirmPhoneWithOtp() {
        this.waiting = false;
        this.auth.confirmWithOtp({
            login: this.phone,
            otp: this.code
        }).then(data => {
            this.waiting = false;
        }).catch(() => {
            this.wrongCode = true;
            this.waiting = false;
        });
    }
}
