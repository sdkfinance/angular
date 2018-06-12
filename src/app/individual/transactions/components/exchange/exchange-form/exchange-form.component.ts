import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Coin} from '../../../../../_classes/coin';

@Component({
    selector: 'app-exchange-form',
    templateUrl: './exchange-form.component.html',
    styles: []
})
export class ExchangeFormComponent implements OnInit {

    /** List of the user's coins */
    @Input() coins: Coin[] = null;
    @Output() exchange = new EventEmitter();

    /** Issuers with which the user has coins */
    issuersList: any[] = null;
    form: FormGroup;
    /** Coin with currency to sell */
    selectedCoin: Coin;
    /** Available issues to buy */
    issuers: any[] = null;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.selectedCoin = this.coins[0];
        this.filterIssuers();
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            coin: this.coins[0].serial,
            issuer: this.issuers[0].id
        });

        this.form.get('coin').valueChanges.subscribe(data => {
            this.selectedCoin  = this.coins.find(coin => coin.serial === data);
            this.filterIssuers();
            this.form.get('issuer').setValue(this.issuers[0].id);
        });
    }

    /**
     * Sets issuers that user has and if issuer is not selected to sell as available to buy
     */
    filterIssuers() {
        this.issuersList = this.coins.map(coin => coin.issuer);
        this.issuers = this.issuersList.filter(issuer => issuer.id !== this.selectedCoin.issuer.id);
    }

    /**
     * Sends selected issuers to next step
     */
    onNext() {
        this.exchange.emit({
            inIssuerId: this.selectedCoin.issuer.id,
            inIssuerCode: this.selectedCoin.issuer.currency,
            outIssuerId: this.form.get('issuer').value,
            outIssuerCode: this.issuers.find(issuer => issuer.id === this.form.get('issuer').value).currency
        });
    }

}
