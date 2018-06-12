import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {saveAs} from 'file-saver';
import * as jsPDF from 'jspdf';
import {Angular2Csv} from 'angular2-csv';

@Component({
    selector: 'app-table-saver',
    templateUrl: './table-saver.component.html',
    styleUrls: ['./table-saver.component.less']
})
export class TableSaverComponent implements OnInit {

    @Input() element: ElementRef;
    @Input() data: { [field: string]: any }[];
    @Input() fileName: string;
    @ViewChild('dataTable') table: ElementRef;

    constructor() {
    }

    ngOnInit() {
    }

    savePDF() {
        const doc = new jsPDF();
        const elementHandler = {
            '#element': function (element, renderer) {
                return true;
            }
        };

        doc.fromHTML((<ElementRef>(this.element || this.table)).nativeElement.innerHTML, 15, 15, {
            'width': 180,
            'elementHandlers': elementHandler
        });

        doc.save(this.fileName || 'table' + '.pdf');
    }

    saveXLS() {
        const blob = new Blob([(<ElementRef>(this.element || this.table)).nativeElement.innerHTML], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        });
        saveAs(blob, this.fileName || 'table' + '.xls');
    }

    saveCSV() {
        const csv = new Angular2Csv(this.data, this.fileName || 'table');
    }

}
