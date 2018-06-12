import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../../../_services/settings.service';

@Component({
    selector: 'app-settings-files',
    templateUrl: './settings-files.component.html',
    styleUrls: ['./settings-files.component.less']
})
export class SettingsFilesComponent implements OnInit {

    /** List of all user documents */
    documents: any[] = null;

    documentTypes: any[];

    /** */
    document = {};

    constructor(private settingsService: SettingsService) {
    }

    ngOnInit() {
        this.getDocumentTypes();
    }

    /**
     * Gets user documents from api and finds passport, bill, tax id and other
     */
    getDocuments() {
        this.settingsService.getDocuments().then(data => {
            this.documents = data.documents;
            this.documents.forEach(document => {
                this.document[document.type] = document;
            });
        });
    }

    getDocumentTypes() {
        this.settingsService.getDocumentTypes().then(data => {
            this.documentTypes = data.documentTypes;
            // this.documentTypes.forEach(type => {
            //     this.document[type.type] = null;
            // });
            this.getDocuments();
        }).catch();
    }

    getRequiredDocumentTypes(): any[] {
        return this.documentTypes.filter(doc => !doc.optional);
    }

    getOptionalDocumentTypes(): any[] {
        return this.documentTypes.filter(doc => doc.optional);
    }
}
