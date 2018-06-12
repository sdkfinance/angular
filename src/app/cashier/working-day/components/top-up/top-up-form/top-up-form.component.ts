import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Form} from '../../../../../_classes/form/form';
import {FormBuilder, Validators} from '@angular/forms';
import {Coin} from '../../../../../_classes/coin';
import {Step} from '../../../../../_enums/step.enum';
import {CashDeskTopUpService} from '../../../../../_services/cash-desk-top-up.service';

@Component({
    selector: 'app-top-up-form',
    templateUrl: './top-up-form.component.html',
    styleUrls: ['./top-up-form.component.less']
})
export class TopUpFormComponent extends Form implements OnInit {

    /** List of the user's coins to top up */
    coins: Coin[];

    /** Step enum */
    steps = Step;
    /** The current step */
    step: Step = this.steps.First;
    /** Top up result */
    result;

    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            contact: ['', Validators.required],
            amount: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*(\.[0-9]{1,2})?$|^[0]+\.(0[1-9]|[1-9][0-9]?)$/)]],
            serial: [''],
            fullName: [''],
            passportData: ['']
        });
    }

    /** Goes to the previous step */
    onBack() {
        this.step--;
    }

    /**
     * Sets the user coins received from the first step
     * @param coins
     */
    setCoins(coins) {
        this.coins = coins;
        this.step = this.steps.Second;
    }

    /**
     * Sets the top up result received from the second step
     * @param result
     */
    setResult(result) {
        this.result = result;
        this.step = this.steps.Third;
    }

}
