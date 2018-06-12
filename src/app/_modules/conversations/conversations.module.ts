import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConversationsComponent} from './components/conversations/conversations.component';
import {ConversationComponent} from './components/conversation/conversation.component';
import {RouterModule} from '@angular/router';
import {CONVERSATIONS_ROUTES} from './conversations.routing';
import {ConversationsService} from '../../_services/conversations.service';
import { ConversationsListComponent } from './components/conversations-list/conversations-list.component';
import { ConversationsListItemComponent } from './components/conversations-list-item/conversations-list-item.component';
import {UiModule} from '../ui/ui.module';
import {FormsModule} from '@angular/forms';
import {I18nPipeModule} from '../i18n-pipe/i18n-pipe.module';

@NgModule({
    imports: [
        CommonModule,
        UiModule,
        FormsModule,
        RouterModule.forChild(CONVERSATIONS_ROUTES),
        I18nPipeModule
    ],
    declarations: [ConversationsComponent, ConversationComponent, ConversationsListComponent, ConversationsListItemComponent],
    providers: [ConversationsService]
})
export class ConversationsModule {
}
