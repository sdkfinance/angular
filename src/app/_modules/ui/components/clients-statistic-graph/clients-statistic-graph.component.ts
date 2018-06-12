import {Component, Input, OnInit} from '@angular/core';
import {NewClientsGraph} from '../../../../_classes/new-clients-graph';
import {StatisticService} from '../../../../_services/statistic.service';

@Component({
  selector: 'app-clients-statistic-graph',
  templateUrl: './clients-statistic-graph.component.html',
  styles: []
})
export class ClientsStatisticGraphComponent implements OnInit {
    dataVal = [];
    graphSeted: boolean = false;
    newClientsGraph = new NewClientsGraph(this.dataVal);
    summary: null;
    constructor(private statisticService: StatisticService ) {
        this.statisticService.getNewClientsStat().then(this.setGraph.bind(this));

    }

    ngOnInit() {
    }
    type = this.newClientsGraph.type;
    dataV : any;
    options = {
        responsive: true,
        cutoutPercentage: 60,
        maintainAspectRatio: false,
        legend: {
            display: false,
            position: 'bottom',
            fullWidth: true,
            labels: {
                fontColor: 'black',
                fontSize: 11
            }
        }
    };

    setGraph(data){
        this.dataVal = [data.mobileCardsCount, data.plasticCardsCount];
        this.dataV = {
            datasets: [{
                data: this.dataVal,
                backgroundColor: ['#3692d8', '#1ab394' ]
            }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
            'Mobile app',
            'Web interface'
        ]
        };
        this.summary = data.totalCardsCount;
        this.graphSeted = true;

    }
}
