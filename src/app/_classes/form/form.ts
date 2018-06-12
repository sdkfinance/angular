import {FormGroup} from '@angular/forms';

export class Form {
    form: FormGroup;
    /** List of possible errors */
    errors: { [key: string]: boolean };
    /** True if form is submitted and waiting for response */
    waiting: boolean;

    constructor() {
        this.errors = {};
        this.waiting = false;
    }

    /**
     * Resets specified errors
     * @param {string} errors
     */
    resetErrors(...errors: string[]) {
        errors.forEach(error => this.errors[error] = false);
    }

    /**
     * Resets all errors
     */
    resetAllErrors() {
        Object.keys(this.errors).forEach(error => this.errors[error] = false);
    }

    /**
     * Checks error and returns true if the form has no errors
     * @returns {boolean}
     */
    checkErrors(controls?: string[]): boolean {
        (controls || Object.keys(this.form.controls)).forEach(key => {
            if (this.form.controls[key].hasError('required')) {
                this.errors[`${key}.required`] = true;
            }

            if (this.form.controls[key].hasError('pattern')) {
                this.errors[`${key}.pattern`] = true;
            }
        });

        return Object.keys(this.errors).every(error => !this.errors[error]);
    }
}
