import {Component, Input, OnInit} from '@angular/core';
import {Profile} from '../../../../_classes/profile';
import {SettingsService} from '../../../../_services/settings.service';
import {AuthorizationService} from "../../../../_services/authorization.service";

@Component({
    selector: 'app-settings-user-contacts',
    templateUrl: './settings-user-contacts.component.html',
    styleUrls: ['./settings-user-contacts.component.less']
})
export class SettingsUserContactsComponent implements OnInit {

    /** Current user profile */
    @Input() profile: Profile = null;
    /** List of errors for displaying relevant message */
    errors = {
        emailRequired: false, // email field is empty
        phoneRequired: false, // phone field is empty
        emailFormat: false, // invalid email format
        phoneFormat: false, // invalid phone format
        emailIsUsed: false, // email is already used (user with the same email exists)
        phoneIsUsed: false, // phone is already used (user with the same phone exists)
        wrongCode: false, // invalid confirmation code
        resendEmailLimit: false, // the number of resend confirmation letter has exceeded
        resendCodeLimit: false // the number of resend confirmation SMS has exceeded
    };
    /** String with email that was inputted by user or existing email */
    email: string = null;
    /** String with phone that was inputted by user or existing phone number */
    phone: string = null;
    /** Confirmation code that was inputted by user */
    code: string = null;
    /** Email to which the code sent */
    sentEmail = null;
    /** Phone to which the code sent */
    sentPhone = null;
    /** True if email with code sent */
    emailSent: boolean = false;
    /** True if SMS with code sent */
    codeSent: boolean = false;
    /** True if email with code resent */
    emailResent: boolean = false;
    /** True if SMS with code resent */
    codeResent: boolean = false;
    /** Number of request to resend code */
    resendEmailCounter: number;
    resendCodeCounter: number;
    /** Max number of request to resend code */
    maxResendNumber: number = 2;
    /** Number of left attempts */
    attempts: number = 4;
    waiting: boolean = false;

    constructor(private settingsService: SettingsService, private authService: AuthorizationService) {
    }

    ngOnInit() {
        this.email = this.profile.profile.contact.email;
        this.phone = this.profile.profile.contact.phoneNumber;
    }

    /**
     * Check email format and if it is valid make request
     * to confirm the email. If we get same errors, displaying them
     */
    confirmEmail() {
        this.errors.emailFormat = false;
        const regex = /^[\d\D]{1,}@[\d\D]{1,}$/;
        if (regex.test(this.email)) {
            this.sentEmail = this.email;
            this.settingsService.confirmContact({
                login: this.sentEmail
            }).then(data => {
                this.emailSent = true;
                this.resendEmailCounter = 0;
            }).catch(error => {
                error = error.error;
                if (error.code == 'INVALID_CONTACT') this.errors.emailFormat = true;
                if (error.code == 'USER_ALREADY_EXISTS') this.errors.emailIsUsed = true;
            });
        } else {
            this.errors.emailFormat = true;
        }
    }

    /**
     * Check phone number format and if it is valid make request
     * to confirm the phone. If we get same errors, displaying them
     */
    confirmPhone() {
        this.errors.phoneFormat = false;
        let regex = /^\+?[0-9]{11,13}$/g;
        if (regex.test(this.phone)) {
            this.sentPhone = this.phone.replace('+', '');
            this.settingsService.confirmContact({
                login: this.sentPhone
            }).then(data => {
                this.codeSent = true;
                this.resendCodeCounter = 0;
            }).catch(error => {
                error = error.error;
                if (error.code == 'INVALID_CONTACT') this.errors.phoneFormat = true;
                if (error.code == 'USER_ALREADY_EXISTS') this.errors.phoneIsUsed = true;
            });
        } else {
            this.errors.phoneFormat = true;
        }
    }

    /**
     * Make request to resend email
     */
    resendEmail() {
        this.emailResent = false;
        if (this.resendEmailCounter < this.maxResendNumber) {
            this.resendEmailCounter++;
            this.settingsService.resendCode({
                login: this.sentEmail
            }).then(data => {
                this.emailResent = true;
            }).catch();
        } else {
            this.errors.resendEmailLimit = true;
        }
    }

    /**
     * Make request to resend SMS
     */
    resendCode() {
        this.codeResent = false;
        if (this.resendCodeCounter < this.maxResendNumber) {
            this.resendCodeCounter++;
            this.settingsService.resendCode({
                login: this.sentPhone
            }).then(data => {
                this.codeResent = true;
            }).catch();
        } else {
            this.errors.resendCodeLimit = true;
        }
    }

    /**
     * Make request to confirm phone number with code from SMS
     */
    confirmPhoneWithOtp() {
        this.waiting = true;
        this.errors.wrongCode = false;
        this.settingsService.confirmContactWithOtp({
            login: this.sentPhone,
            otp: this.code
        }).then(data => {
            this.profile = data;
            this.email = this.profile.profile.contact.email;
            this.phone = this.profile.profile.contact.phoneNumber;
            this.sentPhone = null;
            this.codeResent = false;
            this.codeSent = false;
            this.errors.wrongCode = false;
            this.errors.phoneIsUsed = false;
            this.errors.phoneFormat = false;
            this.waiting = false;
        }).catch(error => {
            if (~error.message.indexOf('Account is locked')) {
                this.authService.logoutUser();
            }
            if (~error.message.indexOf('Incorrect code')) {
                this.attempts--;
            } else {
                this.errors.wrongCode = true;
            }
            this.waiting = false;
        });
    }

}
