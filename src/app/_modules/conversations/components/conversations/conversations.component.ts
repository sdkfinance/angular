import {Component, HostListener, OnInit} from '@angular/core';
import {Conversation} from '../../../../_classes/conversations/conversation';
import {PAGE_TITLES, WINDOW_TITLE} from "../../../../app.constants";
import {TitleService} from "../../../../_services/title.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'app-conversations',
    templateUrl: './conversations.component.html',
    styles: []
})
export class ConversationsComponent implements OnInit {

    /** Conversation selected to open */
    openedConversation: Conversation;
    /** The window width */
    width = window.innerWidth;

    /**
     * Updates the window width when resize
     * @param event
     */
    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.width = event.target.innerWidth;
    }

    constructor(private title: Title) {
        this.title.setTitle(PAGE_TITLES.messages);
        TitleService.setTitle(WINDOW_TITLE.messages);
    }

    ngOnInit() {
    }

    openConversation(conversation) {
        this.openedConversation = conversation;
    }

    closeConversation() {
        this.openedConversation = null;
    }

}
