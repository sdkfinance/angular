import {Component, OnInit} from '@angular/core';
import {IssuersService} from '../../../../_services/issuers.service';
import {Issuer} from '../../../../_interfaces/issuer';
import {Pagination} from '../../../../_services/page-state/pagination';

@Component({
    selector: 'app-issuers-table',
    templateUrl: './issuers-table.component.html',
    styleUrls: ['./issuers-table.component.less']
})
export class IssuersTableComponent implements OnInit {

    issuers: Issuer[];

    constructor(private issuersService: IssuersService) {
    }

    ngOnInit() {
        this.getIssuers();
    }

    getIssuers() {
        this.issuersService.updateIssuersSubject();
        this.issuersService.getIssuersSubject().subscribe(data => {
            this.issuers = <Issuer[]>data;
        });
    }

}
