export class News {
    id: string;
    name: string;
    broadcast: boolean;
    unread: boolean;
    createdAt: Date;
    lastMessageCreatedAt: Date;
    initiator: {
        id: string;
        type: string;
        entityId: string
    };
    participants: Participant[];

    constructor(news ?: News) {
        if (news) {
        }
    }
}


class Participant {
    id: string;
    type: string;
    entityId: string;
}
