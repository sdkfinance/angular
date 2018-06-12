import {Component, OnInit} from '@angular/core';
import {PosService} from "../../../../_services/pos.service";
import {Pos} from "../../../../_classes/pos";

@Component({
    selector: 'app-dashboard-pos',
    templateUrl: './dashboard-pos.component.html',
    styles: []
})
export class DashboardPosComponent implements OnInit {

    pointsOfSale: Pos[] = null;

    constructor(private posService: PosService) {
    }

    ngOnInit() {
        this.getPointsOfSale();
    }

    getPointsOfSale() {
        this.posService.getPosList()
            .then(res => {
                this.pointsOfSale = <Pos[]>res;
            })
            .catch(error => console.log(error));
    }

}
