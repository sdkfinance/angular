import {Pipe, PipeTransform, WrappedValue} from '@angular/core';

@Pipe({
    name: 'numbersOnly'
})
export class NumbersOnlyPipe implements PipeTransform {

    transform(value: string): any {
        return WrappedValue.wrap(value.replace(/\D/g, '')).wrapped;
    }

}
