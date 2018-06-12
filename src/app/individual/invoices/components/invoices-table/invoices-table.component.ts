import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Pagination} from '../../../../_services/page-state/pagination';
import {InvoicesService} from '../../../../_services/invoices.service';
import {AuthorizationService} from "../../../../_services/authorization.service";

@Component({
    selector: 'app-invoices-table',
    templateUrl: './invoices-table.component.html',
    styleUrls: ['invoices-table.component.less']
})
export class InvoicesTableComponent extends Pagination implements OnInit, OnDestroy {

    @Output() pay = new EventEmitter();

    /** If true we show window with status filters */
    showStatuses: boolean = false;
    /** Previous value of showStatuses */
    showStatusesControl: boolean = true;

    /** List of invoices */
    invoices = null;
    /** Information about sort */
    sort = {
        date: 'desc',
        totalPrice: null
    };
    /** All filters */
    filter = '';

    /** List of possible statuses */
    statuses: any[] = [
        {selected: true, type: 'initiated'},
        {selected: true, type: 'pending'},
        {selected: true, type: 'approved'},
        {selected: true, type: 'paid'},
        {selected: true, type: 'declined'},
        {selected: true, type: 'expired'}
    ];

    isMerchant: boolean = false;
    direction: string = 'INCOMING';

    constructor(private invoicesService: InvoicesService, private authService: AuthorizationService) {
        super();
    }

    /**
     * Subscribes to updates of invoices list
     */
    ngOnInit() {
        if (this.authService.userProfile.hasRole('merchant')) {
            this.isMerchant = true;
            this.direction = 'OUTGOING';
        }
        if (this.invoicesService.storage) {
            this.getFromStorage();
        }
        this.invoicesService.getInvoiceSubject()
            .subscribe(data => {
                this.invoices = (<any>data).records;
                this.totalPages = (<any>data).totalPages;
                this.page = (<any>data).pageNumber;
            });
        this.invoicesService.updateInvoiceSubject(this.invoicesService.lastBody || this.createRequestBody());
    }

    /**
     * Sends selected invoices into invoice payment component
     * @param invoice Invoice to pay
     */
    onPay(invoice) {
        this.pay.emit(invoice);
    }

    /**
     * Gets invoices from API
     */
    getInvoices() {
        this.invoicesService.updateInvoiceSubject(this.createRequestBody());
    }

    /**
     * Changes current page and gets invoices on the page
     * @param page
     */
    onPagination(page) {
        this.page = page;
        this.getInvoices();
    }

    /**
     * Gets invoices list after search button click
     */
    onSearch() {
        this.page = 0;
        this.invoices = null;
        this.getInvoices();
    }

    /**
     * Resets the filters form
     */
    onReset() {
        this.page = 0;
        this.filter = '';
        this.getInvoices();
    }

    /**
     * Gets selected statuses and gets filtered invoices list by status,
     * hides window with status filters
     * @param search
     */
    onFilterStatus(search) {
        this.showStatuses = this.showStatusesControl;
        if (search) {
            this.invoicesService.updateInvoiceSubject(this.createRequestBody());
        }
        this.showStatusesControl = !this.showStatusesControl;
    }

    /**
     * Creates object with current params: filters, sort, page number
     * @returns object Request body
     */
    createRequestBody() {
        return {
            filter: {
                identifier: this.filter ? this.filter : null,
                direction: this.direction,
                statuses: this.statuses.map(element => {
                    if (element.selected) {
                        return element.type;
                    }
                })
            },
            sort: this.sort,
            pageNumber: this.page,
            pageSize: this.size
        }
    }

    /**
     * Sets sort params and gets invoices list with them
     * @param type Sort property - date or amount
     */
    onSort(type) {
        const prev = this.sort[type];
        Object.keys(this.sort).forEach(k => this.sort[k] = null);
        if (prev === null || prev === 'desc') {
            this.sort[type] = 'asc';
        } else {
            this.sort[type] = 'desc';
        }

        this.getInvoices();
    }

    /**
     * Writes information about selected statuses, filters, and sort to service
     */
    setToStorage() {
        this.invoicesService.storage = {};
        this.invoicesService.storage['statuses'] = this.statuses;
        this.invoicesService.storage['filter'] = this.filter;
        this.invoicesService.storage['sort'] = this.sort;
    }

    /**
     * Reads information about selected statuses, filters, and sort from service
     */
    getFromStorage() {
        this.sort = this.invoicesService.storage['sort'];
        this.statuses = this.invoicesService.storage['statuses'];
        this.filter = this.invoicesService.storage['filter'];
        this.invoicesService.storage = null;
    }

    /**
     * Saves current filters so that the user could continue after coming back with last filter
     */
    ngOnDestroy() {
        this.setToStorage();
    }

}
