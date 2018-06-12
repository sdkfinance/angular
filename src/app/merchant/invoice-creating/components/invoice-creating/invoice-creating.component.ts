import {Component, OnInit} from '@angular/core';
import {AuthorizationService} from '../../../../_services/authorization.service';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {Title} from '@angular/platform-browser';
import {TitleService} from '../../../../_services/title.service';
import {InvoiceTemplatesService} from '../../../../_services/invoice-templates.service';
import {Coin} from '../../../../_classes/coin';
import {InvoiceTemplate} from '../../../../_interfaces/invoice-template';
import {CoinsService} from '../../../../_services/coins.service';

@Component({
    selector: 'app-invoice-creating',
    templateUrl: './invoice-creating.component.html',
    styleUrls: ['./invoice-creating.component.less']
})
export class InvoiceCreatingComponent implements OnInit {

    /** List of the current merchant coins */
    coins: Coin[];
    /** List of invoice templates */
    templates: InvoiceTemplate[];

    /** Result of invoice creating */
    resultInvoice;

    constructor(private titleService: Title, private authService: AuthorizationService, private coinsService: CoinsService,
                private templateService: InvoiceTemplatesService) {
        TitleService.setTitle(WINDOW_TITLE.createInvoice);
        this.titleService.setTitle(PAGE_TITLES.invoices);
    }

    ngOnInit() {
        this.getCoins();
        this.getTemplates();
    }

    /**
     * Gets coins from API
     */
    getCoins() {
        this.coinsService.getCoins().then(data => this.coins = data.coins.filter(c => c.type === 'client')).catch(e => e);
    }

    /**
     * Gets templates from API
     */
    getTemplates() {
        this.templateService.getTamplates().then(data => this.templates = data.records).catch(e => e);
    }

    /**
     * Sets result of invoice creating
     * @param invoice
     */
    setResult(invoice) {
        this.resultInvoice = invoice;
    }

}
