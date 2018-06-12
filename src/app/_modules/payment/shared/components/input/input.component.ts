import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
    @Input() label: string = '';
    @Input() description: string = '';
    @Input() maxLength: number;
    @Input() required: boolean;

    @Input() val: string = '';
    @Input() name: string = '';
    @Input() placeholder = '';
    @Input() pattern: string = '';

    @Input() parent: FormGroup;

    @Output() valUpdated = new EventEmitter();

    subscription: Subscription;

    constructor() {
    }

    ngOnInit() {
    }

    public onValInput(): void {
        this.valUpdated.emit(this.parent.get(this.name).value);
    }

}
