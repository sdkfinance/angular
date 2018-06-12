import {Pipe, PipeTransform, WrappedValue} from '@angular/core';

@Pipe({
    name: 'hideSymbols'
})
export class HideSymbolsPipe implements PipeTransform {

    transform(value: string, hide: boolean, realVal: string): any {
        const transformed = hide
            ? value.replace(/[^0-9\u2022]/gu, '').replace(/\d/g, '\u2022')
            : realVal.replace(/\D/g, '');
        return WrappedValue.wrap(transformed).wrapped;
    }

}
