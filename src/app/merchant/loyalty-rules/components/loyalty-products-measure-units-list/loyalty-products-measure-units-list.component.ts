import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MeasureUnit} from '../../../../_classes/measure-unit';
import {ProductsService} from '../../../../_services/products.service';

@Component({
    selector: 'app-loyalty-products-measure-units-list',
    templateUrl: './loyalty-products-measure-units-list.component.html',
    styles: [`* {font-size: 14px}`],
    host: {
        '(document:click)': 'onClick($event)',
    }
})
export class LoyaltyProductsMeasureUnitsListComponent implements OnInit {

    @Output() selectedMeasureUnitUpdate = new EventEmitter();
    @Input() measureUnitsList: MeasureUnit[];

    showMeasureUnits: boolean = false;
    selectedMeasureUnit: MeasureUnit = null;
    menuTitle: string = 'Choose';

    constructor(private eRef: ElementRef) {
    }

    ngOnInit() {
    }


    onMenuTitleClick() {
        this.showMeasureUnits = !this.showMeasureUnits;
    }

    onItemClick(measureUnit: MeasureUnit) {
        this.showMeasureUnits = false;
        this.selectedMeasureUnit = measureUnit;
        this.menuTitle = measureUnit.code;
        this.selectedMeasureUnitUpdate.emit(this.selectedMeasureUnit);
    }

    onClick(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.showMeasureUnits = false;
        }
    }
}
