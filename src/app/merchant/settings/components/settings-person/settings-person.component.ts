import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SettingsService} from "../../../../_services/settings.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Profile} from "../../../../_classes/profile";

@Component({
    selector: 'app-settings-person',
    templateUrl: './settings-person.component.html',
    styles: []
})
export class SettingsPersonComponent implements OnInit {

    @Input() profile: Profile;
    @Input() currentProfile;
    @Output() saveNameChanges: EventEmitter<any> = new EventEmitter();
    settingsForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }


    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.settingsForm = this.fb.group({
            profileNameFirst: ["", Validators.required],
            profileNameMiddle: [""],
            profileNameLast: ["", Validators.required]
        });
    }

    profileNameIsChange() {
        if(this.profile.profile.person.namePlain.middle === "") this.profile.profile.person.namePlain.middle = null;
        return (
            this.currentProfile.firstName != this.profile.profile.person.namePlain.first ||
            this.currentProfile.middleName != this.profile.profile.person.namePlain.middle ||
            this.currentProfile.lastName != this.profile.profile.person.namePlain.last
        );
        //return true;
    }

    onSaveNameChanges() {
        this.saveNameChanges.emit();
    }
}
