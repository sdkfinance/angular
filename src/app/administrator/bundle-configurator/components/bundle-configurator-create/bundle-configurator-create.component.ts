import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BundleConfiguratorService} from '../../../../_services/bundle-configurator.service';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-bundle-configurator-create',
    templateUrl: './bundle-configurator-create.component.html',
    styles: []
})
export class BundleConfiguratorCreateComponent implements OnInit {

    bundleForm: FormGroup;
    waiting: boolean = false;

    keyError: boolean = false;

    constructor(private fb: FormBuilder,
                private bundleService: BundleConfiguratorService,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService) {
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.bundleForm = this.fb.group({
            key: ['', Validators.pattern('^[a-z0-9._-]*$')],
            valueEn: [''],
            valueRu: [''],
            valueUk: ['']
        });
    }

    onCreate() {
        if (this.bundleForm.get('key').hasError('pattern')) {
            this.keyError = true;
            return;
        }
        this.keyError = false;
        this.waiting = true;
        this.bundleService.createBundle(this.crateRequestBody())
            .then(data => {
                this.waiting = false;
                this.bundleForm.reset();
                this.openSnackBarComponent();
                this.bundleService.updateBundles();
            })
            .catch(() => this.waiting = false);
    }

    crateRequestBody() {
        return {
            key: this.bundleForm.get('key').value,
            values: [
                {
                    locale: 'en',
                    value: this.bundleForm.get('valueEn').value,
                },
                {
                    locale: 'ru',
                    value: this.bundleForm.get('valueRu').value,
                },
                {
                    locale: 'uk',
                    value: this.bundleForm.get('valueUk').value,
                }
            ]
        }
    }

    openSnackBarComponent() {
        this.snackBarService.setMessage('Bundle created!');
        this.snackBarService.setAction('create');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100
        });
    }

}
