import {Component, Input, OnInit} from '@angular/core';
import {Coin} from '../../../../_classes/coin';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {ConfirmDeleteComponent} from '../../../../_modules/ui/components/confirm-delete/confirm-delete.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {CoinsService} from '../../../../_services/coins.service';

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.less']
})
export class WalletComponent implements OnInit {
    /** The user's coin */
    @Input() coin: Coin;

    /** New coin title input by user */
    newTitle: string = '';
    /** True if editing window is open */
    editCoin: boolean = false;

    constructor(public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService,
                private dialog: MatDialog,
                private coinsService: CoinsService) {
    }

    ngOnInit() {
    }

    /**
     * Opens editing window
     */
    onEdit() {
        this.newTitle = this.coin.name;
        this.editCoin = !this.editCoin;
    }

    /**
     * Makes a request to edit coin name
     */
    onUpdateCoin() {
        this.coinsService.updateCoin(this.coin.serial, {name: this.newTitle})
            .then(() => {
                this.editCoin = false;
                this.coinsService.updateCoinsList();
            });

    }

    /**
     * Opens confirmation dialog and
     * Makes request to delete user coin
     * @param {string} title
     */
    onDelete(title: string = 'New story') {
        this.dialog.open(ConfirmDeleteComponent, {
            width: '370px',
            data: {
                title: title,
                nameToDelete: this.coin.name,
                outputData: this.coin.serial
            }
        }).afterClosed().subscribe(serial => {
            if (event && serial) {
                this.coinsService.deleteCoin(serial).then(() => {
                    this.coinsService.updateCoinsList();
                    this.openSnackBarComponent();
                });
            }
        });
    }

    /**
     * Opens snack bar with info about successful deleting
     */
    openSnackBarComponent() {
        this.snackBarService.setMessage('Wallet deleted!');
        this.snackBarService.setAction('delete');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100,
        });
    }


}
