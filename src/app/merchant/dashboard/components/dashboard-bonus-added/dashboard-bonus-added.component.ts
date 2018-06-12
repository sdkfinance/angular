import { Component, OnInit } from '@angular/core';
import {DatePeriod} from "../../../../_classes/date-period";
import {TransactionService} from "../../../../_services/transaction.service";
import {BonusesService} from "../../../../_services/bonuses.service";
import {CoinsService} from "../../../../_services/coins.service";

@Component({
  selector: 'app-dashboard-bonus-added',
  templateUrl: './dashboard-bonus-added.component.html',
  styles: []
})
export class DashboardBonusAddedComponent implements OnInit {
    bonFrom:number = 0;
    arr= ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь','ноябрь', 'декабрь',];
    arrIndex = (new Date()).getMonth();
    constructor(
      private transactionService: TransactionService,
      private bonusesService: BonusesService,
      private coinsService: CoinsService

  ) {

  }

  ngOnInit() {
      this.coinsService.getCoins().then(this.setUserBonusCoin.bind(this));
      this.setTotalredcords(event);
  }

    setTotalredcords(posId?) {
        let d = new DatePeriod( new Date());
        let body = {
            pageSize: 20,
            filter: {
                types: ['merchant_payment']/*,
                 dateFrom: d.getPeriod().periodFrom,
                 dateTo: d.getPeriod().periodTo*/
            }
        };
        this.transactionService.getTransView(body).then(this.allPages.bind(this));

    }

    allPages(data){
        let pages = Math.ceil( data.totalRecords / 20);
        for (let i = 0; i < pages; i++){
            let filterBody= {
                pageSize: 20,
                pageNumber: i,
                filter: {
                    types: ['merchant_payment']/*,
                     dateFrom: d.getPeriod().periodFrom,
                     dateTo: d.getPeriod().periodTo*/
                }
            };

            this.transactionService.getTransView(filterBody).then( data => {
                // this.totalRecords = data.totalRecords;
                for(let record of data.records){
                    this.checkTranscations(record.transactions);
                }
                // console.log(this.bonTo);
            });

        }
    }
    checkTranscations(transactions){
        for(let transaction of transactions){
         //   console.log('CHECK');
         //   console.log(transaction);
            if (transaction.from.serial === this.bonusesService.getBonusCoin()){
             //   console.log('Начислено:'+ transaction.amount);
                this.bonFrom += transaction.amount;
            }/*
            if (transaction.to.serial === this.bonusesService.getBonusCoin()){
                console.log('Списано:'+ transaction.amount);
                this.bonTo += transaction.amount;
            }*/
        }

    }
    setUserBonusCoin(data){
        for ( let coin of data.coins){
            if(coin.issuer.currency === "BON"){
                this.bonusesService.setBonusCoin(coin.serial);
            }
        }
      //  console.log(this.bonusesService.getBonusCoin());
    }
}
