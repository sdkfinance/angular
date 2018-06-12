import {Pipe, PipeTransform} from '@angular/core';
import {I18nService} from '../_services/i18n.service';
import {I18N_RECORDS} from '../app.constants';

@Pipe({
    name: 'i18n'
})
export class I18nPipe implements PipeTransform {

    constructor(private i18nService: I18nService) {
    }

    transform(value: any, args?: any): any {
        let string: string = this.i18nService.locales[value] || I18N_RECORDS[this.i18nService.currentLocale.locale][value];

        if (string) {
            if (args) {
                for (let key in args) {
                    string = string.replace(new RegExp('\\{' + key + '\\}', 'g'), args[key]);
                }
            }
            return string;
        } else {
            return value;
        }
    }

}
