import {Component, Input, OnInit} from '@angular/core';
import {Pos} from '../../../../_classes/pos';
import {PosService} from '../../../../_services/pos.service';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ConfirmDeleteComponent} from '../../../../_modules/ui/components/confirm-delete/confirm-delete.component';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {SnackBarService} from '../../../../_services/snack-bar.service';

@Component({
    selector: 'app-pos-actions',
    templateUrl: './pos-actions.component.html',
    styles: []
})
export class PosActionsComponent implements OnInit {
    @Input() pos: Pos;

    constructor(private posService: PosService,
                private dialog: MatDialog,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService) {
    }

    ngOnInit() {
    }

    onChangePos() {
        this.posService.setLocalPOS(this.pos);
    }

    onDeletePos(posId) {
        if (event && posId) {
            this.posService.deletePos(posId).then(data => {
                this.posService.updatePosList();
                this.openSnackBarComponent();
            });
        }
    }

    openDialog(title: string = 'New story'): void {
        this.dialog.open(ConfirmDeleteComponent, {
            width: '370px',
            data: {
                title: title,
                nameToDelete: this.pos.name,
                outputData: this.pos.id
            }
        }).afterClosed().subscribe(this.onDeletePos.bind(this));
    }

    openSnackBarComponent() {
        this.snackBarService.setMessage('POS deleted!');
        this.snackBarService.setAction('delete');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100,
        });
    }
}

