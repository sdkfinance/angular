export interface WorkingDay {
    id: string;
    cashdesk: {
        id: string;
        type: string;
        name: string
    };
    cashier: {
        id: string;
        name: string
    };
    status: string;
    createdAt: string;
    start: string;
}
