import {Component, OnInit} from '@angular/core';
import {BankService} from '../../../../_services/bank.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SnackBarComponent} from "../../../../_modules/ui/components/snack-bar/snack-bar.component";
import {SnackBarService} from "../../../../_services/snack-bar.service";
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'app-adding-bank',
    templateUrl: './adding-bank.component.html',
    styles: []
})
export class AddingBankComponent implements OnInit {

    waiting: boolean = false;

    constructor(private bankService: BankService, private router: Router, private route: ActivatedRoute,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService) {
    }

    ngOnInit() {
    }

    /**
     * Males a request to add bank
     * @param bank Object with added bank details
     */
    createAccount(bank) {
        this.waiting = true;
        this.bankService.createBankAccount({
            accountDetails: bank
        }).then(data => {
            this.waiting = false;
            this.openSnackBarComponent();
            this.router.navigate(['../'], {relativeTo: this.route});
        }).catch(() => this.waiting = false);
    }

    /**
     * Goes back to list of user banks
     * @param event
     */
    onBack(event) {
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    openSnackBarComponent() {
        this.snackBarService.setMessage('Bank account added!');
        this.snackBarService.setAction('create');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100,
        });
    }

}
