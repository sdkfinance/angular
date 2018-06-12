import {Pipe, PipeTransform, WrappedValue} from '@angular/core';

@Pipe({
    name: 'lettersOnly'
})
export class LettersOnlyPipe implements PipeTransform {

    private trimLeft(val: string): string {
        if (!val) {
            return val;
        }
        return val[0] === ' ' ? val.substring(1, val.length) : val;
    }

    transform(value: string): any {
        return WrappedValue.wrap(this.trimLeft(value).replace(/[^A-Za-z\s]/g, '')).wrapped;
    }

}
