export class LoyaltyGroup {
    id: string;
    createdAt: Date;
    name: string;
    conditions: any;

    constructor(loyaltyGroup?: LoyaltyGroup) {
        if (loyaltyGroup) {
            this.id = loyaltyGroup.id || '';
            this.createdAt = new Date(loyaltyGroup.createdAt) || new Date();
            this.name = loyaltyGroup.name || '';
            this.conditions = Object.assign({}, loyaltyGroup.conditions || {});
        }
    }
}
