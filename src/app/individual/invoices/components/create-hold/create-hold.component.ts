import {Component, OnInit} from '@angular/core';
import {InvoicesService} from '../../../../_services/invoices.service';
import {CoinsService} from '../../../../_services/coins.service';
import {CardService} from '../../../../_services/card.service';
import {GatesService} from '../../../../_services/gates.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Coin} from '../../../../_classes/coin';
import {Invoice} from '../../../../_interfaces/invoice';
import {PaymentCard} from '../../../../_interfaces/payment-card';
import {PaymentProvider} from '../../../../_interfaces/payment-provider';
import {Title} from '@angular/platform-browser';
import {TitleService} from '../../../../_services/title.service';
import {PAGE_TITLES, WINDOW_TITLE} from '../../../../app.constants';
import {CardHoldItem} from '../../../../_interfaces/card-hold-item';

@Component({
    selector: 'app-create-hold',
    templateUrl: './create-hold.component.html',
    styleUrls: ['./create-hold.component.less']
})
export class CreateHoldComponent implements OnInit {

    /** List of the user's coins */
    coins: Coin[];
    /** The invoice to pay */
    invoice: Invoice;
    /** List of the user's attached payment cards */
    cards: PaymentCard[];
    /** List of providers */
    providers: PaymentProvider[];
    /** Created card hold */
    createdHold: CardHoldItem;

    constructor(private invoicesService: InvoicesService, private coinsService: CoinsService, private cardService: CardService,
                private gatesService: GatesService, private route: ActivatedRoute, private router: Router, private titleService: Title) {
        TitleService.setTitle(WINDOW_TITLE.cardHolds);
        this.titleService.setTitle(PAGE_TITLES.cardHolds);
    }

    ngOnInit() {
        this.getData();
    }

    /**
     * Gets invoice, user's coins, user's payment cards from API
     */
    getData() {
        Promise.all([
            this.invoicesService.getInvoice(this.route.snapshot.params['id']),
            this.coinsService.getCoins(),
            this.cardService.getCards()
        ]).then(data => {
            this.invoice = data[0].invoice;
            this.coins = data[1].coins;
            this.cards = data[2].records;
            this.getProviders();
        }).catch(() => {
            this.router.navigate(['../../'], {relativeTo: this.route});
        });
    }

    /**
     * Gets provider account for coin with necessary currency
     */
    getProviders() {
        const serial = this.coins.find(coin => coin.issuer.id === this.invoice.issuer.id && coin.type === 'client').serial;

        this.gatesService.getProviders({
            txType: 'TOPUP',
            serial: serial
        }).then(data => {
            this.providers = data.records;
        }).catch();
    }

    /**
     * Sets created card hold
     * @param hold
     */
    setCreatedHold(hold) {
        this.createdHold = hold;
    }
}
