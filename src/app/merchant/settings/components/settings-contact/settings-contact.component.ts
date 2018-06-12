import {Component, Input, OnInit} from '@angular/core';
import {SettingsService} from "../../../../_services/settings.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Profile} from "../../../../_classes/profile";

@Component({
    selector: 'app-settings-contact',
    templateUrl: './settings-contact.component.html',
    styles: []
})
export class SettingsContactComponent implements OnInit {
    @Input() profile: Profile;
    settingsForm: FormGroup;

    constructor(private fb: FormBuilder, private settingsService: SettingsService) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.settingsForm = this.fb.group({
            profileEmail: ["", [Validators.pattern(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/)]],
            profilePhoneNumber: ["", [Validators.pattern(/^[+][0-9]{11,12}$/)]]
        });
    }
}
