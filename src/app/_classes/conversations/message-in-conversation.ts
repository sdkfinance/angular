import {Participant} from './participant';

export class MessageInConversation {
    id: string;
    sender: Participant;
    text: string;
    createdAt: string;
    updatedAt: string;
    read: boolean;

    constructor(message?: MessageInConversation) {
        Object.assign(this, message);
    }
}
