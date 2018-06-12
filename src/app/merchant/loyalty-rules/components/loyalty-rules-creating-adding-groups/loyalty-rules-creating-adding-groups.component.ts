import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoyaltyGroup} from "../../../../_classes/loyalty-group";
import {LoyaltyGroupsService} from "../../../../_services/loyalty-groups.service";

@Component({
    selector: 'app-loyalty-rules-creating-adding-groups',
    templateUrl: './loyalty-rules-creating-adding-groups.component.html',
    styleUrls: ['./loyalty-rules-creating-adding-groups.component.less']
})
export class LoyaltyRulesCreatingAddingGroupsComponent implements OnInit {

    @Output() selectedLoyaltyGroupsUpdate = new EventEmitter();

    loyaltyGroups: LoyaltyGroup[] = null;
    selectedLoyaltyGroups: LoyaltyGroup[];
    loyaltyGroupsTitle = "Loyalty group";


    constructor(private loyaltyGroupsService: LoyaltyGroupsService) {
    }

    ngOnInit() {
        this.getLoyaltyGroups();
        this.createNewEmptyLoyaltyGroupsList();
    }

    getLoyaltyGroups() {
        this.loyaltyGroupsService.getLoyaltyGroupsFromHttp()
            .then(res => this.loyaltyGroups = res)
            .catch(error => console.log(error))
    }

    onAddLoyaltyGroup() {
        this.selectedLoyaltyGroups.push(null);
    }

    updateSelectedLoyaltyGroup(loyaltyGroup: LoyaltyGroup, idx: number) {
        this.selectedLoyaltyGroups[idx] = loyaltyGroup;
    }

    createNewEmptyLoyaltyGroupsList() {
        this.selectedLoyaltyGroups = [null];
        this.selectedLoyaltyGroupsUpdate.emit(this.selectedLoyaltyGroups);
    }

    onDelete(idx: number) {
        if (this.selectedLoyaltyGroups.length > 1) {
            this.selectedLoyaltyGroups.splice(idx, 1);
        } else {
            this.selectedLoyaltyGroups[0] = null
        }
    }

    canDelete() {
        return (this.selectedLoyaltyGroups.length > 1) || (this.selectedLoyaltyGroups[0]);
    }

    clearSelectedLoyaltyGroups() {
        this.createNewEmptyLoyaltyGroupsList();
    }

}
