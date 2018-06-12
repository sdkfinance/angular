import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zerobefore'
})
export class ZerobeforePipe implements PipeTransform {

  transform(value: any, length?: number): string {
      let result: string= '';
      let strVal = value.toString();
      let strValLength = strVal.length;

      if (strValLength < length) {
          for (let i =0; i < (length - strValLength); i++) {
              result += '0';
          }
          result += strVal;
      }
      else {
          result += strVal;
      }
    return result;
  }

}
