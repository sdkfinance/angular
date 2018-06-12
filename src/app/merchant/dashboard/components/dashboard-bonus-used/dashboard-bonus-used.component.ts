import { Component, OnInit } from '@angular/core';
import {CoinsService} from "../../../../_services/coins.service";
import {BonusesService} from "../../../../_services/bonuses.service";
import {TransactionService} from "../../../../_services/transaction.service";
import {DatePeriod} from "../../../../_classes/date-period";

@Component({
  selector: 'app-dashboard-bonus-used',
  templateUrl: './dashboard-bonus-used.component.html',
  styles: []
})
export class DashboardBonusUsedComponent implements OnInit {
    bonTo:number = 0;
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
        let pages = 0;

        console.log(d);
        let body = {
            pageSize: 20,
            filter: {
                types: ['merchant_payment']/*,
                dateFrom: d.getPeriod().periodFrom,
                dateTo: d.getPeriod().periodTo*/
            }
        };
        this.transactionService.getTransView(body).then(this.allPages.bind(this));
       // console.log(pages);

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
            //console.log('CHECK2');
           // console.log(transaction);
            if (transaction.to.serial === this.bonusesService.getBonusCoin()){
             //  console.log('Списано:' + transaction.amount);
                this.bonTo += transaction.amount;
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
