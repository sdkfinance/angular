import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CoinsService} from '../../../../_services/coins.service';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-wallet-create',
    templateUrl: './wallet-create.component.html',
    styles: []
})
export class WalletCreateComponent implements OnInit {

    /** List of issuers with which the user doesn't have coins */
    @Input() issuers;
    waiting: boolean = false;
    coinForm: FormGroup;
    /** True if field is empty */
    showError: boolean = false;

    constructor(private fb: FormBuilder,
                private coinsService: CoinsService,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService) {
    }

    ngOnInit() {
        this.coinForm = this.fb.group({
            name: [''],
            currency: ['null']
        });

        this.coinForm.valueChanges.subscribe(() => this.showError = false);
    }

    /**
     * Checks errors and if there are no errors
     * makes request to create new coin and after
     * resets form and updates coins list
     */
    onCreate() {
        this.showError = false;
        this.waiting = true;
        if (!this.coinForm.get('name').value || this.coinForm.get('currency').value == 'null') {
            this.showError = true;
            this.waiting = false;
        } else {
            this.coinsService.createCoin({
                name: this.coinForm.get('name').value,
                issuerId: this.coinForm.get('currency').value
            }).then(() => {
                this.coinForm.get('name').setValue('');
                this.coinForm.get('currency').setValue('null');
                this.showError = false;
                this.coinsService.updateCoinsList();
                this.waiting = false;
                this.openSnackBarComponent();
            }).catch(() => this.waiting = false);
        }

    }

    /**
     * Opens snack bar with info about successful coin creating
     */
    openSnackBarComponent() {
        this.snackBarService.setMessage('Wallet created!');
        this.snackBarService.setAction('create');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100,
        });
    }

}
