import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-base-form',
    templateUrl: './base-form.component.html',
    styleUrls: ['./base-form.component.less']
})
export class BaseFormComponent implements OnInit, OnChanges {

    @Input() fields;
    /** Values in field */
    @Input() values = {};
    /** Errors in values of fields */
    @Input() errors = {};
    @Input() serverErrors = [];
    @Input() waiting;

    @Output() onSubmit = new EventEmitter();
    @Output() back = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['fields']) {
            for (let field of this.fields) {
                if (field.constraints && field.constraints[0] && field.constraints[0].options && field.constraints[0].options.length) {
                    this.values[field.name] = field.constraints[0].options[0].value;
                } else {
                    this.values[field.name] = '';
                }
                this.errors[field.name] = '';
            }
        }
        if (changes['serverErrors']) {
            this.resetErrors();

            if (this.serverErrors) {
                this.serverErrors.forEach(e => this.errors[e.parameter] = e.message);
            }
        }
        // this.waiting = false;
    }

    /**
     * Resets all errors
     */
    resetErrors() {
        Object.keys(this.errors).forEach(key => this.errors[key] = '');
    }

    makeTransaction() {
        this.waiting = true;
        // this.resetErrors();

        this.fields.forEach(field => {
            if (!field.optional && !this.values[field.name].length) {
                this.errors[field.name] = 'Please fill in this field';
            }
        });

        for (let key in this.errors) {
            if (this.errors[key].length) {
                this.waiting = false;
                return;
            }
        }

        this.onSubmit.emit(this.createBody());
    }

    /**
     * Gathers fields and values into request body as object
     * @returns {{optionName; fields: Array}}
     */
    createBody() {
        let fields = [];
        Object.keys(this.values).forEach(key => fields.push({
            name: key,
            value: this.values[key]
        }));
        return fields;
    }

    onBack() {
        this.back.emit();
    }
}
