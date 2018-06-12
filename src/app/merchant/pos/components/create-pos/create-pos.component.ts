import {Component, Input, OnInit} from '@angular/core';
import {SnackBarComponent} from '../../../../_modules/ui/components/snack-bar/snack-bar.component';
import {SnackBarService} from '../../../../_services/snack-bar.service';
import {PosService} from '../../../../_services/pos.service';
import {MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Pos} from '../../../../_classes/pos';

@Component({
    selector: 'app-create-pos',
    templateUrl: './create-pos.component.html',
    styleUrls: ['./create-pos.component.less']
})
export class CreatePosComponent implements OnInit {

    @Input() pos: Pos;

    createPosForm: FormGroup;
    formSubmitted = false;

    constructor(private posService: PosService,
                public snackBarComponent: MatSnackBar,
                private snackBarService: SnackBarService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.createPosForm = this.fb.group({
            posName: [this.pos ? this.pos.name : '', Validators.required],
            posDescription: [this.pos ? this.pos.description : '', Validators.required]
        });
    }

    openSnackBarComponent() {
        if (this.pos) {
            this.snackBarService.setMessage('Pos edited!');
        } else {
            this.snackBarService.setMessage('Pos created!');
        }
        this.snackBarService.setAction('create');
        this.snackBarComponent.openFromComponent(SnackBarComponent, {
            duration: 1100
        });
    }

    onCreate(form: FormGroup) {
        this.formSubmitted = true;
        if (this.createPosForm.valid) {
            let pos = new Pos();
            pos.name = (form.controls.posName.value).toString();
            pos.description = (form.controls.posDescription.value).toString();

            if (this.pos) {
                pos.id = this.pos.id;
            }
            (this.pos ? this.posService.updatePos(pos) : this.posService.createPos(pos)).then(() => {
                this.posService.updatePosList();
                this.openSnackBarComponent();
            });
            if (this.pos) {
                this.posService.setLocalPOS(null);
            }
            this.createPosForm.reset();
            this.formSubmitted = false;
        }
    }

}
