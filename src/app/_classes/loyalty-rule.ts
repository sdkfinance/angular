export class LoyaltyRule {
    id: string;
    type: string;
    name: string;
    description: string;
    active: boolean;
    startsAt: Date;
    endsAt: Date;
    valueType: string;
    value: number;
    activationPolicy: string;

    constructor(loyaltyRules: LoyaltyRule) {
        if (loyaltyRules) {
            this.id = loyaltyRules.id;
            this.type = loyaltyRules.type;
            this.name = loyaltyRules.name;
            this.description = loyaltyRules.description;
            this.active = loyaltyRules.active;
            this.startsAt = new Date(loyaltyRules.startsAt);
            if (loyaltyRules.endsAt)
                this.endsAt = new Date(loyaltyRules.endsAt);
            else this.endsAt = null;
            this.valueType = loyaltyRules.valueType;
            this.value = loyaltyRules.value;
            this.activationPolicy = loyaltyRules.activationPolicy;
        }
    }
}
