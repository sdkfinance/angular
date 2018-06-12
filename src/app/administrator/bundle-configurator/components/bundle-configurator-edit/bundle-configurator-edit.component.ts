import {Component, OnInit} from '@angular/core';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {MatSnackBar} from '@angular/material';
import {BundleConfiguratorService} from '../../../../_services/bundle-configurator.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {TitleService} from '../../../../_services/title.service';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {Bundle} from '../../../../_classes/bundle';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-bundle-configurator-edit',
    templateUrl: './bundle-configurator-edit.component.html',
    styles: []
})
export class BundleConfiguratorEditComponent implements OnInit {

    bundle: Bundle = null;
    bundleForm: FormGroup;
    waiting: boolean = false;
    bundleId;
    constructor(private fb: FormBuilder,
                private bundleService: BundleConfiguratorService,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService,
                private titleService: Title,
                private route: ActivatedRoute) {
        TitleService.setTitle(WINDOW_TITLE.i18n);
        this.titleService.setTitle(PAGE_TITLES.i18n);
    }


    ngOnInit() {
        this.bundleId = this.route.snapshot.params.id;
        this.createForm();
        this.getBundle();
    }

    getBundle() {
        this.bundleService.viewBundles({
            filter: {
                ids: [
                    this.bundleId
                ]
            }
        }).then(data => {
            this.bundle = data.records[0];
            // this.bundleForm.get('key').setValue(this.bundle.key);
            this.bundleForm.get('valueEn').setValue(this.findValueByLocale('en'));
            this.bundleForm.get('valueRu').setValue(this.findValueByLocale('ru'));
            this.bundleForm.get('valueUk').setValue(this.findValueByLocale('uk'));
        });
    }

    createForm() {
        this.bundleForm = this.fb.group({
            // key: [''],
            valueEn: [''],
            valueRu: [''],
            valueUk: ['']
        });
    }

    onCreate() {
        this.waiting = true;
        this.bundleService.updateBundle(this.bundleId, this.crateRequestBody())
            .then(data => {
                this.waiting = false;
                // this.bundleForm.reset();
                this.openSnackBarComponent();
            })
            .catch(() => this.waiting = false);
    }

    crateRequestBody() {
        return {
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
        };
    }

    openSnackBarComponent() {
        this.snackBarService.setMessage('Bundle changed!');
        this.snackBarService.setAction('create');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100
        });
    }

    findValueByLocale(locale) {
        for (let item of this.bundle.values) {
            if (item.locale == locale) return item.value;
        }
    }
}
