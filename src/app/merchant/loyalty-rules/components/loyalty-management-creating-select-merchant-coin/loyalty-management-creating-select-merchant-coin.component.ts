import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Coin} from "../../../../_classes/coin";

@Component({
    selector: 'app-loyalty-management-creating-select-merchant-coin',
    templateUrl: './loyalty-management-creating-select-merchant-coin.component.html',
    styles: [`* {
        font-size: 14px
    }`],
    host: {
        '(document:click)': 'onClick($event)',
    }
})
export class LoyaltyManagementCreatingSelectMerchantCoinComponent implements OnInit {
    @Output() selectedCoinUpdate = new EventEmitter();
    @Input() coins: Coin[];

    showCoins: boolean = false;
    selectedCoin: Coin = null;
    menuTitle: string = "Select";

    constructor(private eRef: ElementRef) {
    }

    ngOnInit() {
    }


    onMenuTitleClick() {
        this.showCoins = !this.showCoins;
    }

    onItemClick(coin: Coin) {
        this.showCoins = false;
        this.selectedCoin = coin;
        this.menuTitle = coin.name;
        this.selectedCoinUpdate.emit(this.selectedCoin);
    }

    onClick(event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.showCoins = false;
        }
    }

    clearSelectedCoin() {
        this.menuTitle = "Выбрать";
        this.selectedCoin = null;
        //this.selectedCoinUpdate.emit(this.selectedCoin);
    }
}
