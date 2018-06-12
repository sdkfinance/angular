import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CoinsService} from '../../../../../_services/coins.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Coin} from '../../../../../_classes/coin';
import {TransferService} from '../../../../../_services/transfer.service';

@Component({
    selector: 'app-transfer-form-recipient',
    templateUrl: './transfer-form-recipient.component.html',
    styles: []
})
export class TransferFormRecipientComponent implements OnInit {

    /** The coin selected by user where funds will be taken from */
    @Input() selectedCoin: Coin = null;
    /** Amount of transfer */
    @Input() amount: number;
    @Output() goBack = new EventEmitter();
    @Output() result = new EventEmitter();
    waiting: boolean = false;
    transferForm: FormGroup;
    /** The recipient's coin  */
    recipientCoin: any = null;
    /** The recipient's coin serial number */
    recipientCoinSerial;
    /** Transfer commission */
    commission: any = null;
    /** List of possible errors */
    errors;

    constructor(private coinsService: CoinsService, private fb: FormBuilder, private transferService: TransferService) {
        this.errors = {
            recipientCoin: false,
            currency: false,
            amount: false,
            senderCoin: false
        };
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.transferForm = this.fb.group({
            recipientCoin: [''],
            description: ['']
        });

        this.transferForm.get('recipientCoin').valueChanges.subscribe((data) => {
            this.recipientCoin = null;
            this.commission = null;
            this.errors.recipientCoin = false;
            this.errors.currency = false;
            this.errors.senderCoin = false;
            if (data) this.validateCoin();
        });

    }

    /**
     * Makes a request to get recipient coin details and after calculates commission if the coin valid
     */
    validateCoin() {
        this.recipientCoinSerial = this.transferForm.get('recipientCoin').value;
        if (this.recipientCoinSerial == this.selectedCoin.serial) {
            this.errors.senderCoin = true;
            return;
        }

        this.coinsService.validateCoin({serial: this.recipientCoinSerial})
            .then(data => {
                this.recipientCoin = data;
                if (this.recipientCoin.issuer.id != this.selectedCoin.issuer.id) {
                    this.errors.currency = true;
                }
                else this.calculateCommissionFee();
            })
            .catch(() => {
                this.errors.recipientCoin = true;
            });
    }

    /**
     * Makes a request to calculate transfer commission
     */
    calculateCommissionFee() {
        let body = {
            senderCoin: this.selectedCoin.serial,
            recipientCoin: this.recipientCoinSerial,
            amount: this.amount,
            description: this.transferForm.get('description').value
        };

        this.transferService.calculateCommissionFee(body)
            .then(data => {
                this.commission = data;
                if (this.commission.transactionAmount > this.selectedCoin.availableAmount) {
                    this.errors.amount = true;
                }
            })
            .catch(() => this.waiting = false);
    }

    /**
     * If there are no errors, makes transfer
     */
    onTransfer() {
        if (!this.transferForm.get('recipientCoin').value) {
            this.errors.recipientCoin = true;
            return;
        }
        if (!this.commission) return;
        this.makeTransfer({
            senderCoin: this.selectedCoin.serial,
            recipientCoin: this.recipientCoinSerial,
            amount: this.amount,
            description: this.transferForm.get('description').value
        });
    }

    /**
     * Make a request to amke transfer
     * @param body
     */
    makeTransfer(body) {
        this.waiting = true;
        this.transferService.makeTransfer(body)
            .then(data => {
                this.waiting = false;
                this.result.emit(data);
            })
            .catch(() => this.waiting = false)
    }

    /**
     * Goes to previous step
     */
    onBack() {
        this.goBack.emit();
    }

}
