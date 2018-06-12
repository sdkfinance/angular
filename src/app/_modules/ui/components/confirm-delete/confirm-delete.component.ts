import {Component, EventEmitter, Input, OnInit, Output, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
    selector: 'app-confirm-delete',
    templateUrl: './confirm-delete.component.html',
    styles: []
})
export class ConfirmDeleteComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<string>) {
    }

    ngOnInit() {
    }

    confirmDelete() {
        this.dialogRef.close(this.data.outputData);
    }
}
