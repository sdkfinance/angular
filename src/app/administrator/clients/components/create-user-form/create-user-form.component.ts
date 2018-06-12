import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ClientsService} from "../../../../_services/clients.service";

@Component({
    selector: 'app-create-user-form',
    templateUrl: './create-user-form.component.html',
    styles: []
})
export class CreateUserFormComponent implements OnInit {
    createUser: FormGroup;

    constructor(fb: FormBuilder, private clientsService: ClientsService) {
        this.createUser = fb.group({
            "email": [null],
            "role": ['merchant'],
            "legalType": ['individual']
        });

        // console.log(this.createUser.controls.role.value);
    }

    ngOnInit() {
    }

    onSubmitForm(form: FormGroup) {
        let createData = {
            "login": this.createUser.get('email').value,
            "role": this.createUser.get('role').value,
            "legalType": this.createUser.get('legalType').value
        };
        if (this.createUser.get('role').value === 'individual') {
            createData.legalType = null;
        }
        this.clientsService.createClient(createData).then(data => this.resetForm());

    }

    resetForm() {
        this.createUser.controls['email'].patchValue(null);
    }

}
