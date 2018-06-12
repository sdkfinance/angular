import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorizationService} from '../../../../_services/authorization.service';
import {Title} from '@angular/platform-browser';
import {PAGE_TITLES} from '../../../../app.constants';

@Component({
    selector: 'app-new-password',
    templateUrl: './new-password.component.html',
    styles: []
})
export class NewPasswordComponent implements OnInit {
    newPassForm: FormGroup;
    isSent: boolean = false;

    constructor(private fb: FormBuilder, private auth: AuthorizationService, private titleService: Title) {
        this.isSent = false;
        this.titleService.setTitle(PAGE_TITLES.newPass);

        this.newPassForm = this.fb.group({
            newPass: [null, [Validators.required]],
            repeatPass: [null, [Validators.required]]
        });
    }

    ngOnInit() {
    }

    onNewPass() {
        let newpass = this.newPassForm.get('newPass').value;
        let repeatpass = this.newPassForm.get('repeatPass').value;
        this.setIsSent(this.isConfirm(newpass, repeatpass));

    }

    setIsSent(flag: boolean) {
        this.isSent = flag;
    }

    isConfirm(newpass, repeatpass) {
        if (newpass === repeatpass) {
            return true;
        } else {
            return false;
        }
    }


}
