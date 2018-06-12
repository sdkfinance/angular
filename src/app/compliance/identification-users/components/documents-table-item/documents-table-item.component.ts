import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ProfileDocumentsService} from "../../../../_services/profile-documents.service";

@Component({
    selector: 'app-documents-table-item',
    templateUrl: './documents-table-item.component.html',
    styleUrls: ['./documents-table-item.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class DocumentsTableItemComponent implements OnInit {

    /** The profile document */
    @Input() document;
    /** Updating documents list after changing */
    @Output() updateList = new EventEmitter();

    constructor(private documentsService: ProfileDocumentsService) {
    }

    ngOnInit() {
    }

    /**
     * Makes a request to approve the document
     */
    onApprove() {
        this.documentsService.approveTheProfileDocument(this.document.id)
            .then(data => this.updateList.emit())
            .catch();
    }

    /**
     * Makes a request to decline the document
     */
    onDecline() {
        this.documentsService.declineTheProfileDocument(this.document.id)
            .then(data => this.updateList.emit())
            .catch();
    }

}
