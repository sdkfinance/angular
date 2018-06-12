import {Component, Input, OnInit} from '@angular/core';
import {AuthorizationService} from "../../../../_services/authorization.service";

@Component({
    selector: 'app-email-sent',
    templateUrl: './email-sent.component.html',
    styles: []
})
export class EmailSentComponent implements OnInit {

    @Input() email;

    emailResent = false;

    constructor(private auth: AuthorizationService) {
    }

    ngOnInit() {
    }

    resendEmail() {
        this.emailResent = false;
        this.auth.resendOtp({
            login: this.email
        }).then(() =>  this.emailResent = true).catch();
    }

}
