import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-statistic-graph',
  templateUrl: './line-statistic-graph.component.html',
  styles: []
})
export class LineStatisticGraphComponent implements OnInit {

    pieChartData =  {
        chartType: 'LineChart',
        dataTable: [
            ['Task', 'Hours per Day', 'Hours per Day'],
            ['Work',     11, 3],
            ['Eat',      2, 4],
            ['Commute',  2, 7],
            ['Watch TV', 2, 2],
            ['Sleep',    7, 8]
        ],
        options: {'title': 'Tasks'},
    };
  constructor() { }

  ngOnInit() {
  }
}
