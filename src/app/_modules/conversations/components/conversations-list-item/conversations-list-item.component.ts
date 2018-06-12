import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Conversation} from '../../../../_classes/conversations/conversation';

@Component({
    selector: 'app-conversations-list-item',
    templateUrl: './conversations-list-item.component.html',
    styleUrls: ['./conversations-list-item.component.less']
})
export class ConversationsListItemComponent implements OnInit {

    /** The onversation */
    @Input() conversation: Conversation;
    /** True if the conversation is opened*/
    @Input() selected: boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

}
