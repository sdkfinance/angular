import {Component, HostListener, OnInit} from '@angular/core';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {TitleService} from '../../../../_services/title.service';
import {Title} from '@angular/platform-browser';
import {AuthorizationService} from '../../../../_services/authorization.service';

@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styles: []
})
export class InvoicesComponent implements OnInit {

    /** Invoice for payment */
    invoiceToPay = null;
    width;

    canCreate: boolean = false;

    constructor(private titleService: Title, private authService: AuthorizationService) {
        TitleService.setTitle(WINDOW_TITLE.invoices);
        this.titleService.setTitle(PAGE_TITLES.invoices);
        this.width = window.innerWidth;
    }

    ngOnInit() {
        if (this.authService.userProfile.hasRole('merchant')) {
            this.canCreate = true;
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.width = event.target.innerWidth;
    }

    /**
     * Gets the invoice to send it into invoice payment component
     * @param invoice for payment
     */
    setInvoice(invoice) {
        this.invoiceToPay = invoice;
    }

}
