import {Component, OnInit, OnDestroy} from '@angular/core';
import {ClientsService} from "../../../../_services/clients.service";
import {Pagination} from "../../../../_services/page-state/pagination";
import {Subscription} from "rxjs";
import {PageState} from "../../../../_services/page-state/page-state";
import {Client} from "../../../../_classes/client";

@Component({
    selector: 'app-clients-list',
    templateUrl: './clients-list.component.html',
    styleUrls: ['./clients-list.component.less']
})
export class ClientsListComponent implements OnInit, OnDestroy {
    searchResValue: string = null;
    private clientsSubscription: Subscription;
    list: Array<Object> = null;
    pagination: Pagination = null;
    canNext: boolean = true;
    canPrev: boolean = false;
    counter: number = 1;

    constructor(private clientsService: ClientsService) {
        this.clientsSubscription = this.clientsService.pageObservable.subscribe(this.updateState.bind(this));

    }

    updateState(pageState: PageState<Client>) {
        this.list = pageState.list;
        this.pagination = pageState.pagination;
    }

    ngOnInit() {
        this.clientsService.updateList();

    }

    ngOnDestroy() {
        this.clientsSubscription.unsubscribe();
    }

    nextPage() {
        //   this.list = null;
        //  this.pagination.page = this.pagination.page + 1;
        this.list = null;
        this.pagination.page = this.pagination.page + 1;
        this.clientsService.updatePagination(this.pagination);
        if (this.pagination.page >= this.pagination.totalPages - 1) {
            this.canNext = false;
        }
        else {
            this.canNext = true;
        }
        if (this.pagination.page <= 0) {
            this.canPrev = false;
        }
        else {
            this.canPrev = true;
        }

        //  this.clientsService.updatePagination(this.pagination);
    }

    prevPage() {
        this.list = null;
        this.pagination.page = this.pagination.page - 1;
        this.clientsService.updatePagination(this.pagination);
        if (this.pagination.page <= 0) {
            this.canPrev = false;
        }
        else {
            this.canPrev = true;
        }
        if (this.pagination.page > this.pagination.totalPages) {
            this.canNext = false;
        }
        else {
            this.canNext = true;
        }

    }

    searchClient(data) {
        for (var key in data.filter) {
            this.searchResValue = data.filter[key];
        }
        this.pagination.page = 0;
        this.clientsService.updateList(data.filter);
    }

    resetSearch(event) {
        this.searchResValue = null;
        this.clientsService.updateList();
    }
}
