import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {InvoicesService} from '../../../../_services/invoices.service';

@Component({
    selector: 'app-invoice-bill',
    templateUrl: './invoice-bill.component.html',
    styleUrls: ['./invoice-bill.component.less']
})
export class InvoiceBillComponent implements OnInit {

    /** An invoice in bill */
    invoice: any = null;
    /** Id of an invoice in bill */
    id;

    constructor(private route: ActivatedRoute, private invoiceService: InvoicesService, private router: Router) {
    }

    /**
     * Gets id of the invoice from route and gets information about it from API
     */
    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.invoiceService.getInvoices({
                pageNumber: 0,
                pageSize: 1,
                filter: {
                    identifier: this.id,
                    direction: this.route.snapshot.params['direction']
                }
            }).then(data => {
                this.invoice = data.records[0];
                if (!this.invoice) {
                    this.router.navigate(['../../'], {relativeTo: this.route});
                }
            }).catch(() => {
                this.router.navigate(['../../'], {relativeTo: this.route});
            });
        });

    }

    /**
     * Opens print window
     */
    onPrint() {
        let printContents, popupWin;
        printContents = document.getElementById('print').innerHTML;
        popupWin = window.open();
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>
        <title>Invoice #${this.id}</title>
          <style>
          td {
            padding: 5px;
            border: 1px solid black
          }
          table {
            border-collapse: collapse;
          }
        </style>
        </head>
        <body onload='window.print(); window.close()'>
          <h2>Invoice #${this.id}</h2>
          ${printContents}
        </body>
      </html>`
        );
        popupWin.document.close();
    }

}
