import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Coin} from '../../../../_classes/coin';
import {CoinsService} from '../../../../_services/coins.service';
import {InvoicesService} from '../../../../_services/invoices.service';

@Component({
    selector: 'app-pay-invoice',
    templateUrl: './pay-invoice.component.html',
    styleUrls: ['./pay-invoice.component.less']
})
export class PayInvoiceComponent implements OnInit, OnChanges {

    /** Invoice for payment */
    @Input() invoice;
    /** Action after close button click */
    @Output() close = new EventEmitter();
    /** List of the user's coins */
    coins: Coin[] = null;
    /** Selected coin */
    coin: Coin = null;
    /** True if coin with necessary currency nod found */
    coinNotFound = false;
    /** Object with information about commission */
    commission = null;
    /** Object with information about payment result */
    result;
    waiting = false;
    /** True if payment ends */
    finish = false;

    constructor(private coinsService: CoinsService, private invoiceService: InvoicesService) {
    }

    /**
     * Scrolls page to payment form and gets the user's coins
     */
    ngOnInit() {
        window.scrollTo(0, 0);
        // this.getCoins();
    }

    /**
     *
     * @param {SimpleChanges} changes
     */
    ngOnChanges(changes: SimpleChanges) {
        if (changes.invoice && changes.invoice.currentValue['identifier'] !== this.invoice.identifier) {
            this.invoice = null;
        }
        this.coin = null;
        this.coinNotFound = false;
        this.commission = false;
        window.scrollTo(0, 0);
        this.getCoins();
    }

    /**
     * Makes request to calculate commission and gets it
     */
    calculateCommission() {
        this.invoiceService.calculateCommissionAsPayer(this.invoice.identifier, {
            payerCoin: this.coin.serial
        }).then(data => this.commission = data).catch(e => e);
    }

    /**
     * Makes request to pay the invoice
     */
    pay() {
        this.waiting = true;
        this.invoiceService.payForInvoice(this.invoice.identifier, {
            payerCoin: this.coin.serial
        }).then(data => {
            this.result = data;
            this.waiting = false;
            this.finish = true;
            this.invoiceService.updateInvoiceSubject();
        }).catch();
    }

    /**
     * Gets the user's coins from API and
     * selects a coin with the same currency as the currency of invoice
     */
    getCoins() {
        this.coinsService.getCoins()
            .then(response => {
                this.coins = response.coins;
                this.coin = this.coins.find(coin => coin.issuer.id === this.invoice.issuer.id);
                if (!this.coin) {
                    this.coinNotFound = true;
                } else {
                    this.calculateCommission();
                }
            })
            .catch(() => this.coins = []);
    }

    onClose() {
        this.close.emit(null);
    }

    /**
     * If the user has enough funds makes payment
     */
    onPay() {
        if (this.coin.availableAmount >= this.commission.recipientAmountPush) {
            this.pay();
        } else {
            this.finish = true;
        }
    }
}
