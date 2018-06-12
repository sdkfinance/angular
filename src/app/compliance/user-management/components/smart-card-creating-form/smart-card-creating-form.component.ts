import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SmartCardsService} from '../../../../_services/smart-cards.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-smart-card-creating-form',
    templateUrl: './smart-card-creating-form.component.html',
    styles: []
})
export class SmartCardCreatingFormComponent implements OnInit {

    @Input() userAccount;
    form: FormGroup;
    errorMessages = {
        number: '',
        name: ''
    };

    errors = {
        nameRequired: 'Card name is required',
        numberRequired: 'Card number is required',
        numberPattern: 'Can include only digits. Min length: 4, max length: 50',
        numberExists: 'Smart card with this number already exists'
    };
    waiting: boolean = false;

    constructor(private fb: FormBuilder, private smartCardsService: SmartCardsService,
                private route: ActivatedRoute, private router: Router,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            number: ['', [Validators.required, Validators.pattern(/[0-9]{4,50}/)]],
            name: ['', Validators.required]
        });

        this.form.controls.name.valueChanges.subscribe(() => this.errorMessages.name = '');
        this.form.controls.number.valueChanges.subscribe(() => this.errorMessages.number = '');
    }

    onCreate() {
        if (this.form.valid) {
            this.createCard();
        } else {
            if (this.form.controls.number.hasError('required')) this.errorMessages.number = this.errors.numberRequired;
            if (this.form.controls.name.hasError('required')) this.errorMessages.name = this.errors.nameRequired;
            if (this.form.controls.number.hasError('pattern')) this.errorMessages.number = this.errors.numberPattern;
        }
    }

    createCard() {
        this.waiting = true;
        this.smartCardsService.createSmartCard({
            name: this.form.controls.name.value,
            number: this.form.controls.number.value,
            organizationId: this.userAccount.members[0].organization.id
        }).then(data => {
            this.waiting = false;
            this.router.navigate(['../'], {relativeTo: this.route});
            this.openSnackBarComponent('create', 'Smart card created');
        }).catch(errors => {
            errors = errors.errors;
            if (errors.find(error => error.message.indexOf('already exists')) !== -1)
                this.errorMessages.number = this.errors.numberExists;
            this.waiting = false;
        });
    }

    openSnackBarComponent(action: string, message: string) {
        this.snackBarService.setMessage(message);
        this.snackBarService.setAction(action);
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100,
        });
    }
}
