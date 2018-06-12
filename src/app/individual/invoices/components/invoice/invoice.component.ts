import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfirmDeleteComponent} from '../../../../_modules/ui/components/confirm-delete/confirm-delete.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {InvoicesService} from '../../../../_services/invoices.service';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.less']
})
export class InvoiceComponent implements OnInit {

    /** One invoice from list */
    @Input() invoice;
    /** Invoice direction */
    @Input() direction;
    /** Payment invoice event */
    @Output() pay = new EventEmitter();

    waiting: boolean = false;

    constructor(private invoicesService: InvoicesService,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
    }

    /**
     * Delete invoice
     * @param id Id of an invoice for deleting
     */
    onDelete(id) {
        this.openDialog(id);
    }

    /**
     *
     * @param invoice A invoice for payment
     */
    onPay(invoice) {
        this.pay.emit(invoice);
    }

    /**
     * Shows confirmation dialog the user,
     * if he confirmed the deleting, sends delete request,
     * and updates invoices list after getting response
     * @param {string} title
     */
    openDialog(title: string = 'New story'): void {
        this.dialog.open(ConfirmDeleteComponent, {
            width: '370px',
            data: {
                title: title,
                nameToDelete: title,
                outputData: title
            }
        }).afterClosed().subscribe(id => {
            if (id) {
                this.waiting = true;
                this.invoicesService.deleteInvoice(id).then(data => {
                    this.invoicesService.updateInvoiceSubject();
                    this.openSnackBarComponent();
                    this.waiting = false;
                }).catch(() => this.waiting = false);
            }
        });
    }

    /**
     * Shows snack bar with information of the successful deleting
     */
    openSnackBarComponent() {
        this.snackBarService.setMessage('Invoice deleted!');
        this.snackBarService.setAction('delete');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100,
        });
    }

}
