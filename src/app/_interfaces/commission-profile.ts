export interface CommissionProfile {
    id: string;
    createdAt: string;
    updatedAt: string;
    flow: {
        id: string;
        code: string;
        transactionType: string;
        processType: string;
        srcCoinType: string;
        destCoinType: string;
    };
    issuer: {
        id: string;
        sn: string;
        currency: string;
    };
    srcParticipantSpecification: {
        type: string;
        value: string;
    };
    destParticipantSpecification: {
        type: string;
        value: string;
    };
    active: boolean;
    direction: string;
    value: {
        type: string;
        valuePercent: number,
        valueFixed: number
    };
}
