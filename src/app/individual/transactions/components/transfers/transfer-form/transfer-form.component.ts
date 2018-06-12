import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Coin} from '../../../../../_classes/coin';
import {FormBuilder, FormGroup} from '@angular/forms';
import {parseNumberString} from '../../../../../app.functions';

@Component({
    selector: 'app-transfer-form',
    templateUrl: './transfer-form.component.html',
    styles: []
})
export class TransferFormComponent implements OnInit {

    /** List of the user's coins */
    @Input() coins: Coin[];
    @Output() result = new EventEmitter();
    @Output() currency = new EventEmitter();

    /** Coin selected by user for transfer */
    selectedCoin: Coin = null;
    transferForm: FormGroup;
    /** List of possible errors */
    errors;
    /** True if it is first step */
    stepOne: boolean = true;

    constructor(private fb: FormBuilder) {
        this.errors = {
            number: false,
            amount: false,
            amountIsEmpty: false
        };
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.transferForm = this.fb.group({
            senderCoin: [this.coins[0].serial],
            amount: ['']
        });

        this.selectedCoin = this.coins[0];

        // if selected coin was changed checks if it has enough funds
        this.transferForm.get('senderCoin').valueChanges.subscribe((data) => {
            this.selectedCoin = this.findCoinBySerial(data);
            if (this.transferForm.get('amount').value) {
                this.errors.amount = (this.transferForm.get('amount').value > this.selectedCoin.availableAmount
                    || this.transferForm.get('amount').value < 0.01);
            }
        });

        //
        this.transferForm.get('amount').valueChanges.subscribe((data) => {
            // reset errors
            this.errors.amountIsEmpty = false;
            // selects only digits from string
            let result: string = parseNumberString(data);
            if (result != data) this.transferForm.get('amount').setValue(result);
            else {
                // sets errors if they are found
                let amount: number = Number(data);
                if (isNaN(amount)) {
                    this.errors.number = true;
                } else {
                    this.errors.number = false;
                    this.errors.amount = (amount > this.selectedCoin.availableAmount || amount < 0.01);
                }
            }
        });

    }

    /**
     * Finds coin with the specified serial number
     * @param serial Coin serial
     * @returns {any} Found coin or null if it was not found
     */
    findCoinBySerial(serial) {
        for (let coin of this.coins) {
            if (coin.serial == serial) return coin;
        }
        return null;
    }

    /**
     * Goes to nex step if the field doesn't have errors
     */
    onNext() {
        if (!this.transferForm.get('amount').value) this.errors.amountIsEmpty = true;
        if (!this.errors.amount && !this.errors.number && !this.errors.amountIsEmpty) {
            this.stepOne = false;
        }
    }

    /**
     * Gets and sets result fo displaying it
     * @param data
     */
    setResult(data) {
        this.currency.emit(this.selectedCoin.issuer.currency);
        this.result.emit(data);
    }

}
