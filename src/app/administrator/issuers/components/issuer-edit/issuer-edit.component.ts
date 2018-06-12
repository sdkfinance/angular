import {Component, OnDestroy, OnInit} from '@angular/core';
import {IssuerService} from '../../servises/issuer.service';
import {IssuersService} from '../../../../_services/issuers.service';
import {Issuer} from '../../../../_interfaces/issuer';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-issuer-edit',
    templateUrl: './issuer-edit.component.html',
    styles: []
})
export class IssuerEditComponent implements OnInit, OnDestroy {

    /** Issuer for editing */
    issuer: Issuer;

    form: FormGroup;

    waiting: boolean = false;

    errors = {
        nameRequired: false,
        descriptionRequired: false,
        orderNumberRequired: false,
        orderQuoteRequired: false,
        orderNumberFormat: false,
        orderQuoteFormat: false
    };

    constructor(private issuerService: IssuerService, private issuersService: IssuersService,
                private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.issuer = this.issuerService.issuer;
        if (!this.issuer) {
            this.router.navigate(['../'], {relativeTo: this.route});
        } else {
            this.createForm();
        }
    }

    createForm() {
        this.form = this.fb.group({
            name: [this.issuer.name, Validators.required],
            description: [this.issuer.description, Validators.required],
            orderNumber: [this.issuer.orderNumber, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
            orderQuote: [this.issuer.orderQuote, [Validators.required, Validators.pattern(/^[0-9]+$/)]]
        });
    }

    onEdit() {
        if (this.checkErrors()) {
            this.waiting = true;
            this.issuersService.updateIssuer(this.issuer.id, {
                name: this.form.get('name').value,
                description: this.form.get('description').value,
                active: this.issuer.active,
                orderNumber: parseInt(this.form.get('orderNumber').value, 10),
                orderQuote: parseInt(this.form.get('orderQuote').value, 10)
            }).then(data => {
                this.waiting = false;
                this.router.navigate(['../'], {relativeTo: this.route});
            }).catch(() => this.waiting = false);
        }
    }

    checkErrors(): boolean {
        if (this.form.controls['name'].hasError('required')) {
            this.errors.nameRequired = true;
        }
        if (this.form.controls['description'].hasError('required')) {
            this.errors.descriptionRequired = true;
        }
        if (this.form.controls['orderNumber'].hasError('required')) {
            this.errors.orderNumberRequired = true;
        }
        if (this.form.controls['orderNumber'].hasError('pattern')) {
            this.errors.orderNumberFormat = true;
        }
        if (this.form.controls['orderQuote'].hasError('required')) {
            this.errors.orderQuoteRequired = true;
        }
        if (this.form.controls['orderQuote'].hasError('pattern')) {
            this.errors.orderQuoteFormat = true;
        }
        return !Object.keys(this.errors).find(key => this.errors[key]);
    }

    resetError(...errors: string[]) {
        errors.forEach(error => this.errors[error] = false);
    }

    ngOnDestroy() {
        this.issuerService.issuer = null;
    }

}
