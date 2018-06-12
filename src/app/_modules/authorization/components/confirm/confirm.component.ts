import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorizationService} from "../../../../_services/authorization.service";

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styles: [],
    encapsulation: ViewEncapsulation.None
})
export class ConfirmComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private auth: AuthorizationService,
                private router: Router) {
        this.parseOtp(this.route.snapshot.queryParams['otp']);
        this.auth.confirmWithOtp(this.parseOtp(this.route.snapshot.queryParams['otp']))
            .then(response => {

            })
            .catch(() => {
                this.router.navigate(['']);
            });
    }

    ngOnInit() {
    }

    parseOtp(str) {
        try {
            str = atob(str);

            let parsedArray = str.split('|', 2);

            return {
                'login': parsedArray[0],
                'otp': parsedArray[1]
            };
        } catch (e) {
            this.router.navigate(['']);
        }

    }

    mapAuthData(data) {

    }


}
