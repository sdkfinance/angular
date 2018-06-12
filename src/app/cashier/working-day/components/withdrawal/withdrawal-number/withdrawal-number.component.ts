import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CashDeskWithdrawalService} from '../../../../../_services/cash-desk-withdrawal.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Form} from '../../../../../_classes/form/form';

@Component({
    selector: 'app-withdrawal-number',
    templateUrl: './withdrawal-number.component.html',
    styleUrls: ['./withdrawal-number.component.less']
})
export class WithdrawalNumberComponent extends Form implements OnInit {

    @Output() getDetails = new EventEmitter();

    constructor(private withdrawalService: CashDeskWithdrawalService, private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            requestNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]]
        });
    }

    /**
     * Makes a request to get withdrawal request details
     */
    getWithdrawalRequestDetails() {
        this.waiting = true;
        this.withdrawalService.getWithdrawalRequest(this.form.get('requestNumber').value).then(data => {
            if (data.processStatus === 'approved_by_accountant') {
                this.getDetails.emit(data);
            } else if (data.processStatus === 'processed') {
                this.errors['processed'] = true;
            } else if (data.processStatus === 'pending') {
                this.errors['pending'] = true;
            }
            this.waiting = false;
        }).catch(e => {
            this.waiting = false;
            this.errors['not_found'] = true;
        });
    }

    /**
     * Checks form errors and gets withdrawal request details if there are no errors
     */
    onSubmit() {
        if (this.checkErrors()) {
            this.getWithdrawalRequestDetails();
        }
    }

}
