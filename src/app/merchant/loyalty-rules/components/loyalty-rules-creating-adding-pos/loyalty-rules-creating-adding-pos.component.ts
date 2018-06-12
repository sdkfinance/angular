import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PosService} from "../../../../_services/pos.service";
import {Pos} from "../../../../_classes/pos";

@Component({
    selector: 'app-loyalty-rules-creating-adding-pos',
    templateUrl: './loyalty-rules-creating-adding-pos.component.html',
    styles: []
})
export class LoyaltyRulesCreatingAddingPosComponent implements OnInit {

    @Output() posListUpdate = new EventEmitter();
    pointsOfSale: Pos[];
    posList = null;

    constructor(private posService: PosService) {
    }

    ngOnInit() {
        this.getPointsOfSale();
    }

    getPointsOfSale() {
        this.posService.getPosList()
            .then(res => {
                this.pointsOfSale = <Pos[]>res;
                this.createPosList();
            })
            .catch(error => console.log(error));
    }

    createPosList() {
        this.posList = [];
        for (let pos of this.pointsOfSale) {
            this.posList.push({
                pos: pos,
                selected: false
            });
        }
        this.posListUpdate.emit(this.posList);
    }

}
