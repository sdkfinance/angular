import {Component, OnInit} from '@angular/core';
import {MeasureUnit} from '../../../../_classes/measure-unit';
import {ProductsService} from '../../../../_services/products.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {MatSnackBar} from '@angular/material';
import {SnackBarService} from '../../../../_services/snack-bar.service';

@Component({
    selector: 'app-loyalty-products-creating',
    templateUrl: './loyalty-products-creating.component.html',
    styleUrls: ['./loyalty-products-creating.component.less']
})
export class LoyaltyProductsCreatingComponent implements OnInit {
    addMeasureUnit: boolean = false;
    productForm: FormGroup;
    selectedMeasureUnit: MeasureUnit = null;
    measureUnitsList: MeasureUnit[] = null;
    showWarning: boolean = false;

    waiting: boolean = false;

    productExternalCodeIsNotUnique: boolean = false;
    measureUnitExternalCodeIsNotUnique: boolean = false;


    constructor(private productsService: ProductsService,
                private fb: FormBuilder,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService) {
    }

    ngOnInit() {
        this.createForm();
        this.getMeasureUnitsFromHttp();
    }

    createForm() {
        this.productForm = this.fb.group({
            externalCode: ['', [Validators.required]],
            nameEn: ['', [Validators.required]],
            nameUk: ['', [Validators.required]],
            descriptionsEn: ['', [Validators.required]],
            descriptionsUk: ['', [Validators.required]],
            measureUnit: this.fb.group({
                externalCode: ['', [Validators.required]],
                codeEn: ['', [Validators.required]],
                codeUk: ['', [Validators.required]],
                descriptionsEn: ['', [Validators.required]],
                descriptionsUk: ['', [Validators.required]]
            })
        });

        this.productForm.valueChanges.subscribe(() => {
            this.showWarning = false;
        });

        this.productForm.get('externalCode').valueChanges.subscribe(() => {
            this.productExternalCodeIsNotUnique = false;
        });

        this.productForm.get('measureUnit.externalCode').valueChanges.subscribe(() => {
            this.measureUnitExternalCodeIsNotUnique = false;
        });
    }

    createMeasureUnit() {
        let data = this.createMeasureUnitRequestBody();

        this.productsService.createMeasureUnit(data)
            .then(res => {
                if ((<any>res).status == 'ok') {
                    this.addMeasureUnit = false; // hidden form for adding measure unit
                    this.productForm.get('measureUnit').reset(); // reset form for adding measure unit
                    this.getMeasureUnitsFromHttp(); // update list of measure unit

                    this.createProduct(<MeasureUnit>(<any>res).measureUnit);
                }
            })
            .catch(error => {
                this.measureUnitExternalCodeIsNotUnique = this.checkForExisting(JSON.parse(error._body).message);
                this.waiting = false;
            });
    }

    createProduct(measureUnit: MeasureUnit) {
        let data = this.createProductRequestBody(measureUnit);

        this.productsService.createProduct(data)
            .then(res => {
                if (res.status == 'ok') {
                    this.waiting = false;
                    this.openSnackBarComponent();
                    this.productForm.reset();
                    this.productsService.updateProducts();
                }
            })
            .catch(error => {
                this.waiting = false;
                this.productExternalCodeIsNotUnique = this.checkForExisting(JSON.parse(error._body).message);
            });
    }

    onCreate() {
        if (this.formHasEmptyFields()) {
            this.showWarning = true;
        } else {
            this.waiting = true;
            if (this.addMeasureUnit) this.createMeasureUnit();
            else {
                this.createProduct(this.selectedMeasureUnit);
            }
        }
    }

    onToggle() {
        this.addMeasureUnit = !this.addMeasureUnit;
        this.productForm.get('measureUnit').reset();
    }

    updateSelectedMeasureUnit(measureUnit: MeasureUnit) {
        this.selectedMeasureUnit = measureUnit;
        this.showWarning = false;
    }

    getMeasureUnitsFromHttp() {
        this.productsService.getMeasureUnits().then(res => this.measureUnitsList = res.records);
    }

    createProductRequestBody(measureUnit: MeasureUnit) {
        return {
            externalCode: this.productForm.get('externalCode').value,
            measureUnit: {
                identifier: measureUnit.id
            },
            names: [
                {
                    locale: 'en',
                    value: this.productForm.get('nameEn').value,
                },
                {
                    locale: 'uk',
                    value: this.productForm.get('nameUk').value,
                }
            ],
            descriptions: [
                {
                    locale: 'en',
                    value: this.productForm.get('descriptionsEn').value,
                },
                {
                    locale: 'uk',
                    value: this.productForm.get('descriptionsUk').value,
                }
            ]
        }
    }

    createMeasureUnitRequestBody() {
        return {
            externalCode: this.productForm.get('measureUnit.externalCode').value,
            codes: [
                {
                    locale: 'en',
                    value: this.productForm.get('measureUnit.codeEn').value
                },
                {
                    locale: 'uk',
                    value: this.productForm.get('measureUnit.codeUk').value
                }
            ],
            descriptions: [
                {
                    locale: 'en',
                    value: this.productForm.get('measureUnit.descriptionsEn').value
                },
                {
                    locale: 'uk',
                    value: this.productForm.get('measureUnit.descriptionsUk').value
                }
            ]
        }
    }

    formHasEmptyFields() {
        if (
            this.productForm.get('externalCode').hasError('required') ||
            this.productForm.get('nameEn').hasError('required') ||
            this.productForm.get('nameUk').hasError('required') ||
            this.productForm.get('descriptionsEn').hasError('required') ||
            this.productForm.get('descriptionsUk').hasError('required') ||
            (!this.selectedMeasureUnit && !this.addMeasureUnit) || (
                this.addMeasureUnit && (
                    this.productForm.get('measureUnit.externalCode').hasError('required') ||
                    this.productForm.get('measureUnit.codeEn').hasError('required') ||
                    this.productForm.get('measureUnit.codeUk').hasError('required') ||
                    this.productForm.get('measureUnit.descriptionsEn').hasError('required') ||
                    this.productForm.get('measureUnit.descriptionsUk').hasError('required')
                ))
        ) return true;
        else return false;
    }

    checkForExisting(message) {
        return !!(~message.indexOf('already exist'));
    }

    openSnackBarComponent() {
        this.snackBarService.setMessage('Product added!');
        this.snackBarService.setAction('create');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100
        });
    }
}
