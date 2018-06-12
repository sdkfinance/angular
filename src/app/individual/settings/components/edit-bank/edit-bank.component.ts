import {Component, OnDestroy, OnInit} from '@angular/core';
import {BankService} from '../../../../_services/bank.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {MatSnackBar} from '@angular/material';

@Component({
    selector: 'app-edit-bank',
    templateUrl: './edit-bank.component.html',
    styles: []
})
export class EditBankComponent implements OnInit, OnDestroy {

    /** A bank to edit */
    bank;
    waiting: boolean = false;

    constructor(private bankService: BankService, private router: Router, private route: ActivatedRoute,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService) {
    }

    ngOnInit() {
        // If there are no bank details in service goes back
        this.bank = this.bankService.bank;
        if (!this.bank) {
            this.router.navigate(['../'], {relativeTo: this.route});
        }
    }

    /**
     * Makes a request to change bank details
     * @param bank New bank details
     */
    updateDetails(bank) {
        this.waiting = true;
        this.bankService.updateBankAccount(this.bank.id, {
            accountDetails: bank
        }).then(data => {
            this.waiting = false;
            this.openSnackBarComponent();
            this.router.navigate(['../'], {relativeTo: this.route});
        }).catch(() => this.waiting = false);
    }

    onBack(event) {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    /**
     * Removes bank details in service after closing editing form
     */
    ngOnDestroy() {
        this.bankService.bank = null;
    }

    openSnackBarComponent() {
        this.snackBarService.setMessage('Bank account changed!');
        this.snackBarService.setAction('create');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100,
        });
    }

}
