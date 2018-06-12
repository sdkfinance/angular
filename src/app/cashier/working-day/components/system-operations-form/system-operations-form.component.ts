import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Form} from '../../../../_classes/form/form';
import {CashCollectsService} from '../../../../_services/cash-collects.service';
import {CashInputsService} from '../../../../_services/cash-inputs.service';
import {InvestmentService} from '../../../../_services/investment.service';

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

    constructor(private fb: FormBuilder,
                private collectsService: CashCollectsService,
                private inputsService: CashInputsService,
                private investmentService: InvestmentService) {
        super();
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            operation: 'cash_input',
            requestNumber: ['', Validators.required]
        });
    }

    /**
     * Makes a request to get operation details
     */
    submitForm() {
        if (this.checkErrors()) {
            this.waiting = true;
            this.getOperation().then(data => {
                this.operation.emit(data);
                this.waiting = false;
            }).catch(error => {
                this.errors['requestNumber.not_found'] = true;
                this.waiting = false;
            });
        }
    }

    /**
     * Returns a getting details request of selected operation
     * @returns {Promise<any>}
     */
    getOperation() {
        const type = this.form.get('operation').value;
        const id = this.form.get('requestNumber').value;
        if (type === 'cash_input') {
            return this.inputsService.viewInputDetails(id);
        } else if (type === 'cash_collect') {
            return this.collectsService.viewCollectDetails(id);
        } else {
            return this.investmentService.viewInvestmentRequest(id);
        }
    }

}
