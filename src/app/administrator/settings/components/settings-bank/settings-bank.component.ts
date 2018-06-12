import {Component, OnInit} from '@angular/core';
import {BankService} from '../../../../_services/bank.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {ConfirmDeleteComponent} from '../../../../_modules/ui/components/confirm-delete/confirm-delete.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SnackBarService} from '../../../../_services/snack-bar.service';

@Component({
    selector: 'app-settings-bank',
    templateUrl: './settings-bank.component.html',
    styleUrls: ['./settings-bank.component.less']
})
export class SettingsBankComponent implements OnInit {

    /** List of the user's bank */
    bankAccounts;

    constructor(private bankService: BankService, private router: Router, private route: ActivatedRoute,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.getBankAccounts();
    }

    /**
     * Gets from API
     */
    getBankAccounts() {
        this.bankService.getBankAccounts().then(data => this.bankAccounts = data.records).catch();
    }

    /**
     * Writes bank details for editing into service and goes to edit form
     * @param bank Bank details user is going to edit
     */
    onEdit(bank) {
        this.bankService.bank = bank;
        this.router.navigate(['edit'], {relativeTo: this.route});
    }

    /**
     * Opens confirmation dialog and if user accepted deleting
     * makes request to delete bank and update list of banks
     * @param bank Bank user is going to delete
     */
    onDelete(bank) {
        this.dialog.open(ConfirmDeleteComponent, {
            width: '370px',
            data: {
                title: '',
                nameToDelete: bank.name,
                outputData: bank.id
            }
        }).afterClosed().subscribe(id => {
            if (id) {
                this.bankService.deleteBankAccount(id).then(() => {
                    this.getBankAccounts();
                    this.openSnackBarComponent();
                }).catch();
            }
        });
    }

    openSnackBarComponent() {
        this.snackBarService.setMessage('Bank account deleted!');
        this.snackBarService.setAction('delete');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100,
        });
    }

}
