export class DatePeriod {
    isoFrom: any;
    isoTo: any;
    currentMonth: any;
    constructor(date: Date){

        if(date){
            let month = this.monthEdit(date.getMonth());
            this.currentMonth = month;
            this.isoFrom = new Date(date.getFullYear() + '-' + this.monthEdit((date.getMonth())) + '-01T12:00:00Z');
         //   date.getFullYear()-(date.getMonth() + 1)-01-T21:00:00.000Z
           this.isoFrom = this.isoFrom.toISOString();
            this.isoTo = (new Date()).toISOString();
        }
    }



    getPeriod() {
        return {
            periodFrom: this.isoFrom,
            periodTo: this.isoTo
        };
    }

    monthEdit(month){
      //  month += 1;
        if(month < 10) {
            month.toString();
            return '0' + month;
        }
        else return month;
    }
    getM(){
        return this.currentMonth;
    }
}
