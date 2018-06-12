import {Component, EventEmitter, HostListener, Input, OnInit} from '@angular/core';
import {ConversationsService} from '../../../../_services/conversations.service';
import {Conversation} from '../../../../_classes/conversations/conversation';
import {Pagination} from '../../../../_services/page-state/pagination';
import {Output} from "@angular/core";

@Component({
    selector: 'app-conversations-list',
    templateUrl: './conversations-list.component.html',
    styles: []
})
export class ConversationsListComponent extends Pagination implements OnInit {

    /** Opened conversation */
    @Input() openedConversation: Conversation;
    /** Opening conversation */
    @Output() openConversation = new EventEmitter();
    /** The conversations list*/
    conversations: Conversation[];

    constructor(private conversationService: ConversationsService) {
        super();
    }

    ngOnInit() {
        this.getConversations();
    }

    /**
     * Makes a request to get the list of the conversations
     */
    getConversations() {
        this.conversationService.getListOfConversations({
            pageNumber: this.page,
            pageSize: this.size
        }).then(data => {
            this.conversations = data.records.map(record => new Conversation(record));
            this.totalPages = data.totalPages;
        }).catch(() => this.conversations = []);
    }

    /**
     * Changes current page
     * @param page
     */
    changePage(page) {
        this.page = page;
        this.getConversations();
    }

    /**
     * Opens conversation
     * @param conversation
     */
    setOpenedConversation(conversation) {
        this.openConversation.emit(conversation);
    }

}
