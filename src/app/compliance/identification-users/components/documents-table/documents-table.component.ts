import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ProfileDocumentsService} from "../../../../_services/profile-documents.service";
import {ActivatedRoute} from "@angular/router";
import {Pagination} from "../../../../_services/page-state/pagination";

@Component({
    selector: 'app-documents-table',
    templateUrl: './documents-table.component.html',
    styleUrls: ['./documents-table.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class DocumentsTableComponent extends Pagination implements OnInit {

    /** The user organization id */
    id: string;
    /** List of the profile documents */
    profileDocuments;

    constructor(private documentsService: ProfileDocumentsService, private route: ActivatedRoute) {
        super();
    }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
        this.getProfileDocuments();
    }

    /**
     * Makes a request to get list of the profile documents
     */
    getProfileDocuments() {
        this.documentsService.viewAllProfileDocuments({
            filter: {
                orgIds: [this.id]
            },
            sort: {
                status: 'desc'
            },
            pageNumber: this.page,
            pageSize: this.size
        }).then(data => {
            this.profileDocuments = data.records;
            this.totalPages = data.totalPages;
        }).catch(() => this.profileDocuments = []);
    }

    /**
     * Changes current page
     * @param page
     */
    changePage(page) {
        this.page = page;
        this.getProfileDocuments();
    }

}
