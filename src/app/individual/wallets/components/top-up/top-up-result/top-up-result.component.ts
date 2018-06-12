import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormSubmittingService} from '../../../../../_services/form-submitting.service';
import {TopUpService} from '../../../services/top-up.service';
import {GateTransactionState} from '../../../../../_interfaces/gate-transaction-state';

@Component({
    selector: 'app-top-up-result',
    templateUrl: './top-up-result.component.html',
    styles: []
})
export class TopUpResultComponent implements OnInit, AfterViewChecked {

    @Input() result;
    @ViewChild('redirectForm') redirectForm: ElementRef;

    redirectFormIsExist: boolean = false;

    constructor(private formService: FormSubmittingService) {
    }

    ngOnInit() {
        this.createRedirectForm();
    }

    /**
     * Shows form for building if it is exist
     */
    createRedirectForm() {
        if (this.result.form) {
            this.redirectFormIsExist = true;
            // this.formService.submitForm(this.result.form).then(data => console.log(data));
        }
    }

    /**
     * Returns names of the form fields
     * @returns {string[]}
     */
    getRedirectFormFields() {
        return Object.keys(this.result.form.parameters);
    }

    /**
     * Submits form when it is built
     */
    ngAfterViewChecked() {
        if (this.redirectFormIsExist) {
            this.redirectForm.nativeElement.submit();
        }
    }

}
