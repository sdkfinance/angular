import { Component, OnInit } from '@angular/core';
import {Pos} from "../../../../_classes/pos";
import {PosService} from "../../../../_services/pos.service";
import {TransactionService} from "../../../../_services/transaction.service";
import {DatePeriod} from "../../../../_classes/date-period";
import {CoinsService} from "../../../../_services/coins.service";
import {BonusesService} from "../../../../_services/bonuses.service";

@Component({
  selector: 'app-dashboard-bonus-charts',
  templateUrl: './dashboard-bonus-charts.component.html',
  styles: []
})
export class DashboardBonusChartsComponent implements OnInit {
    posList: Pos[];
    totalRecords: number = null;
    bonFrom:number = 0;
    bonTo: number = 0;
    currentPosId:string;
    dataFrom:any = [];
    dataTo:any = [];

    lineGraphData:any = [this.dataFrom, this.dataTo];


  constructor(private posService: PosService, private transactionService: TransactionService
  , private coinsService: CoinsService, private bonusesService: BonusesService
  ) {
      this.posService.getPosList().then((data: Pos[]) => {
              this.onSuccessPosList(data);
              this.posService.posListUpdates.subscribe(this.onSuccessPosList.bind(this));
          }
      );
      this.coinsService.getCoins().then(this.setUserBonusCoin.bind(this));


  }

  ngOnInit() {

      this.test();
  }

    onSuccessPosList(array: Pos[]) {
        this.posList = [];
        for (let i in array) {
            this.posList.push(array[i]);
        }
       // console.log(this.posList);

    }

    test(event?) {
        this.coinsService.getCoins().then(this.setUserBonusCoin.bind(this));

        this.setTotalredcords(event);
       // console.log(this.totalRecords);
       // console.log(this.bonusesService.getBonusCoin());
      //  console.log(this.bonFrom);
    }

    setTotalredcords(posId?) {
        let d = new DatePeriod( new Date());
        this.currentPosId = posId;
        let body = {
            pageSize: 20,
            filter: {
                filterType: 'merchant_payment',
                dateFrom: d.getPeriod().periodFrom,
                dateTo: d.getPeriod().periodTo,
                posIds: [posId]
            }
        };
        this.transactionService.getTransView(body).then(this.allPages.bind(this));
        // console.log(pages);

    }

    allPages(data){
        let d = new DatePeriod( new Date());
        let pages = Math.ceil( data.totalRecords / 20);
        for (let i = 0; i < pages; i++){
            let filterBody= {
                pageSize: 20,
                pageNumber: i,
                filter: {
                    filterType: 'merchant_payment',
                    dateFrom: d.getPeriod().periodFrom,
                    dateTo: d.getPeriod().periodTo,
                    posIds: [this.currentPosId]
                }
            };

            this.transactionService.getTransView(filterBody).then( data => {
                // this.totalRecords = data.totalRecords;
                for(let record of data.records){
                    this.checkTranscations(record.transactions);
                }
            });

        }
    }


    checkTranscations(transactions){
      for(let transaction of transactions){

          if (transaction.from.serial === this.bonusesService.getBonusCoin()){
              this.dataFrom.push({
                  dateFrom: transaction.performedAt,
                  valueFrom: transaction.amount
              });
          }
          if (transaction.to.serial === this.bonusesService.getBonusCoin()){
              this.dataTo.push({
                  dateTo: transaction.performedAt,
                  valueTo: transaction.amount
              });
          }
      }


    }
    setUserBonusCoin(data){
        for ( let coin of data.coins){
           if(coin.issuer.currency === "BON"){
               this.bonusesService.setBonusCoin(coin.serial);
           }
        }
     //   console.log(this.bonusesService.getBonusCoin());
    }

}
/*
filterType: 'merchant_payment',
    dateFrom: d.getPeriod().periodFrom,
    dateTo: d.getPeriod().periodTo,
    posIds: [posId]*/
