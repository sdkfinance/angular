import {Component, Input, OnInit} from '@angular/core';
import {PosService} from '../../../../_services/pos.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-pos-info-table',
    templateUrl: './pos-info-table.component.html',
    styleUrls: ['./pos-info-table.component.less']
})
export class PosInfoTableComponent implements OnInit {
    id: any;
    detailsInfo: any = null;
    isDetailsInfoEmpty: boolean = false;

    totalPages: number;
    currentPage: number;
    pageSize: number = 20;
    totalRecords: number;
    pageNumber: number = 0;

    sort = {
        date: 'desc',
        status: null
    };

    sortInfo = {
        sortDate: true,
        sortDateAsc: false,
        sortStatus: false,
        sortStatusAsc: false
    };

    constructor(private route: ActivatedRoute, private posService: PosService) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
        this.getDetails();

    }

    getDetails() {
        let body = {
            sort: this.sort,
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
        };
        this.posService.getPosDetails(this.route.snapshot.params.id, body).then(this.setDetailsInfo.bind(this));
    }

    setDetailsInfo(data) {
        this.detailsInfo = data.records;
        this.totalRecords = data.totalRecords;
        this.totalPages = (<any>data).totalPages;
        this.currentPage = (<any>data).pageNumber;
        if (this.detailsInfo.length == 0) {
            this.isDetailsInfoEmpty = true;
        }
    }

    onNextPage() {
        this.pageNumber = this.currentPage + 1;
        this.getDetails();
    }

    onPreviousPage() {
        this.pageNumber = this.currentPage - 1;
        this.getDetails();
    }

    onSortDate() {
        this.sortInfo.sortDate = true;
        this.sortInfo.sortStatus = false;
        this.sortInfo.sortDateAsc = !this.sortInfo.sortDateAsc;
        this.sort.status = null;
        this.sort.date = this.sortInfo.sortDateAsc ? 'asc' : 'desc';
        this.getDetails();
    }

    onSortStatus() {
        this.sortInfo.sortDate = false;
        this.sortInfo.sortStatus = true;
        this.sortInfo.sortStatusAsc = !this.sortInfo.sortStatusAsc;
        this.sort.date = null;
        this.sort.status = this.sortInfo.sortStatusAsc ? 'asc' : 'desc';
        this.getDetails();
    }
}
