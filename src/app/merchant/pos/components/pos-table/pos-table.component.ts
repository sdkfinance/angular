import {Component, Input, OnInit} from '@angular/core';
import {Pos} from '../../../../_classes/pos';
import {Pagination} from '../../../../_classes/pagination';
import {PosService} from '../../../../_services/pos.service';

@Component({
    selector: 'app-pos-table',
    templateUrl: './pos-table.component.html',
    styleUrls: ['./pos-table.component.less']
})
export class PosTableComponent implements OnInit {
    @Input() posList: Pos[];
    @Input() posLength: number;
    posPagination: Pagination = new Pagination();

    constructor(private posService: PosService) {
        this.posPagination.pagesSize = 10;
        this.posPagination.allPagesSize = 11;

    }

    ngOnInit() {

    }

    setPosLength(length) {
        this.posLength = length;
    }

    test(event) {
    }
}
