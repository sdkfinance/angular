import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Form} from '../../../../_classes/form/form';
import {CashCollectsService} from '../../../../_services/cash-collects.service';
import {CashInputsService} from '../../../../_services/cash-inputs.service';
import {InvestmentService} from '../../../../_services/investment.service';
import {GateInvestmentService} from '../../../../_services/gate-investment.service';

@Component({
    selector: 'app-system-operations-form',
    templateUrl: './system-operations-form.component.html',
    styleUrls: ['./system-operations-form.component.less']
})
export class SystemOperationsFormComponent extends Form implements OnInit {

    /** Sends received operation details to the parent component */
    @Output() operation = new EventEmitter();

    errors = {
        'requestNumber.required': false,
        'requestNumber.not_found': false
    };

    constructor(private fb: FormBuilder, private gateInvestmentService: GateInvestmentService) {
        super();
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            // operation: 'cash_input',
            requestNumber: ['', Validators.required]
        });
    }

    /**
     * Makes a request to get operation details
     */
    submitForm() {
        if (this.checkErrors()) {
            this.waiting = true;
            this.gateInvestmentService.viewInvestmentRequest(this.form.get('requestNumber').value).then(data => {
                this.operation.emit(data);
                this.waiting = false;
            }).catch(error => {
                this.errors['requestNumber.not_found'] = true;
                this.waiting = false;
            });
        }
    }

}
