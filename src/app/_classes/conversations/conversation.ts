import {Participant} from './participant';

export class Conversation {
    id: string;
    name: string;
    broadcast: boolean;
    unread: boolean;
    createdAt: string;
    lastMessageCreatedAt: string;
    initiator: Participant;
    participants: Participant[];

    constructor(conversation?: Conversation) {
        Object.assign(this, conversation);
    }
}
