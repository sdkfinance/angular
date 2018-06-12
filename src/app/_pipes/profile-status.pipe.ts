import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'profileStatus'
})
export class ProfileStatusPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        switch (value) {
            case "none": return "Unidentified";
            case "pending": return "Under consideration";
            case "approved": return "Identified";
            case "declined": return "Rejected";
            default: return "";
        }
    }

}
