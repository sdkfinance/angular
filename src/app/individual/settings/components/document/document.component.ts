import {Component, Input, OnInit} from '@angular/core';
import {MediaFilesService} from '../../../../_services/media-files.service';
import {SettingsService} from '../../../../_services/settings.service';

@Component({
    selector: 'app-document',
    templateUrl: './document.component.html',
    styleUrls: ['./document.component.less']
})
export class DocumentComponent implements OnInit {

    /** Document name */
    @Input() title: string;
    /** Type of document */
    @Input() docType: string;
    /** Existing document */
    @Input() document;
    /** Files to upload */
    files;
    waiting: boolean = false;

    constructor(private mediaFilesService: MediaFilesService, private settingsService: SettingsService) {
    }

    ngOnInit() {
    }

    /**
     * Makes a request to add document
     */
    sendFile() {
        this.waiting = true;
        let fileInfo;
        this.mediaFilesService.uploadFile(this.files[0])
            .then(data => {
                fileInfo = data.file;
                this.settingsService.submitFile({
                    fileId: fileInfo.id,
                    type: this.docType
                }).then(data => {
                    this.document = data.document;
                    this.files = null;
                    this.waiting = false;
                }).catch(() => this.waiting = false);
            })
            .catch(() => this.waiting = false);
    }

    /** Sets files from input field */
    onUpload(event) {
        this.files = event.srcElement.files;
    }
}
