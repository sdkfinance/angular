import {Component, OnDestroy, OnInit} from '@angular/core';
import {Pagination} from '../../../../_services/page-state/pagination';
import {BundleConfiguratorService} from '../../../../_services/bundle-configurator.service';
import {Bundle} from '../../../../_classes/bundle';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfirmDeleteComponent} from '../../../../_modules/ui/components/confirm-delete/confirm-delete.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {Subscription} from 'rxjs/Subscription';
import {saveAs} from 'file-saver';

@Component({
    selector: 'app-bundle-configurator-table',
    templateUrl: './bundle-configurator-table.component.html',
    styleUrls: ['./bundle-configurator-table.component.less']
})
export class BundleConfiguratorTableComponent extends Pagination implements OnInit, OnDestroy {

    bundles: Bundle = null;
    keyFilter: string = '';
    valueFilter: string = '';
    filters: FormGroup;
    sort = {key: 'asc'};
    subscription: Subscription;

    constructor(private bundleService: BundleConfiguratorService,
                private fb: FormBuilder,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService,
                private dialog: MatDialog) {
        super();
    }

    ngOnInit() {
        this.filters = this.fb.group({
            key: [''],
            value: ['']
        });

        this.subscription = this.bundleService.getBundles().subscribe(data => {
            this.bundles = data.records;
            this.totalPages = data.totalPages;
            this.page = data.pageNumber;
        });

        this.bundleService.updateBundles(this.bundleService.lastBody || this.createRequestBody());

        if (this.bundleService.lastBody) {
            this.filters.get('key').setValue(this.bundleService.lastBody.filter.key);
            this.filters.get('value').setValue(this.bundleService.lastBody.filter.value);
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSearch() {
        this.page = 0;
        this.keyFilter = this.filters.get('key').value;
        this.valueFilter = this.filters.get('value').value;
        this.bundleService.updateBundles(this.createRequestBody());
    }

    onReset() {
        this.page = 0;
        this.keyFilter = '';
        this.valueFilter = '';
        this.filters.reset();
        this.bundleService.updateBundles(this.createRequestBody());
    }

    onDelete(bundle) {
        this.openDialog(bundle);
    }

    createRequestBody() {
        return {
            filter: {
                key: this.keyFilter,
                value: this.valueFilter
            },
            sort: this.sort,
            pageNumber: this.page,
            pageSize: this.size
        };
    }

    openDialog(bundle, title: string = 'New story'): void {
        this.dialog.open(ConfirmDeleteComponent, {
            data: {
                title: title,
                nameToDelete: bundle.key,
                outputData: bundle.id
            }
        }).afterClosed().subscribe(this.deleteBundle.bind(this));
    }

    deleteBundle(bundleId) {
        if (event && bundleId) {
            this.bundleService.deleteBundle(bundleId).then(() => {
                this.bundleService.updateBundles();
                this.openSnackBarComponent();
            });
        }

    }

    openSnackBarComponent() {
        this.snackBarService.setMessage('Bundle deleted!');
        this.snackBarService.setAction('delete');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100,
        });
    }

    onSort() {
        if (this.sort.key === 'asc') {
            this.sort.key = 'desc';
        } else if (this.sort.key === 'desc') {
            this.sort.key = 'asc';
        }
        this.bundleService.updateBundles(this.createRequestBody());
    }

    onSave() {
        this.bundleService.downloadInFile().then(data => {
            // let blob = new Blob([(<any>data).blob()], { type: 'application/vnd.ms-excel' });
            // let url= window.URL.createObjectURL(blob);
            // window.open(url);
            // saveAs(blob, 'i18n.xls');

            saveAs(data, 'i18n.xls');
        });
    }

    changePage(page) {
        this.page = page;
        this.bundleService.updateBundles(this.createRequestBody());
    }
}
