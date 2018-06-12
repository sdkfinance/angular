export class Participant {
    id: string;
    type: string;
    entityId: string;

    constructor(participant?: Participant) {
        Object.assign(this, participant);
    }
}
