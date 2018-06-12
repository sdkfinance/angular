import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Conversation} from '../../../../_classes/conversations/conversation';
import {MessageInConversation} from '../../../../_classes/conversations/message-in-conversation';
import {ConversationsService} from '../../../../_services/conversations.service';
import {Pagination} from '../../../../_services/page-state/pagination';

@Component({
    selector: 'app-conversation',
    templateUrl: './conversation.component.html',
    styleUrls: ['./conversation.component.less']
})
export class ConversationComponent extends Pagination implements OnInit, OnChanges, OnDestroy {

    /** Selected conversation */
    @Input() conversation: Conversation;
    /** Closing the current conversation */
    @Output() close = new EventEmitter();

    timer;
    /** Message entered by the user */
    message;
    /** List of messages in the conversation */
    messages: MessageInConversation[];
    /** Delay before the next updating of messages list*/
    delay: number = 10000;
    /** The id of the current user */
    userId = JSON.parse(localStorage.getItem('sdk.finance_common_token')).user.id;

    constructor(private conversationsService: ConversationsService) {
        super();
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.messages = null;
        clearTimeout(this.timer);
        this.page = 0;
        this.getMessages();
    }

    /**
     * Makes a request to get messages
     */
    getMessages() {
        this.conversationsService.getMessagesForSpecifiedConversation(this.conversation.id, {
            sort: {
                date: 'desc'
            },
            pageNumber: this.page,
            pageSize: this.size
        }).then(data => {
            this.totalPages = data.totalPages;
            this.messages = this.messages || [];
            data.records.map(record => new MessageInConversation(record)).forEach(value => this.messages.push(value));
            clearTimeout(this.timer);
            this.timer = setTimeout(this.getNewMessages.bind(this), this.delay);
        }).catch();
    }

    /**
     * Makes a request to get messages newer than last one
     */
    getNewMessages() {
        let date: Date;
        if (this.messages[0]) {
            date = new Date(this.messages[0].createdAt);
            date.setMilliseconds(date.getMilliseconds() + 1);
        } else {
            date = null;
        }

        this.conversationsService.getMessagesForSpecifiedConversation(this.conversation.id, {
            sort: {
                date: 'desc',
            },
            filter: {
                dateFrom: date.toISOString()
            },
            pageNumber: 0,
            pageSize: this.size
        }).then(data => {
            this.totalPages = data.totalPages;
            this.messages = this.messages || [];
            data.records.map(record => new MessageInConversation(record)).forEach(value => this.messages.unshift(value));
            clearTimeout(this.timer);
            this.timer = this.timer = setTimeout(this.getNewMessages.bind(this), this.delay);
        }).catch();
    }

    /**
     * Closes the conversation
     */
    onClose() {
        this.close.emit();
    }

    /**
     * Makes a request to send a new message
     */
    sendMessage() {
        if (this.message) {
            this.conversationsService.writeMessageInSpecifiedConversation(this.conversation.id, {
                text: this.message
            }).then(data => {
                this.message = '';
                this.getNewMessages();
            }).catch();
        }
    }

    /**
     * Gets messages from the next page
     */
    onNextPage() {
        this.page++;
        this.getMessages();
    }

    ngOnDestroy() {
        clearTimeout(this.timer);
    }

}
