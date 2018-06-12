import {Router, Routes} from '@angular/router';
import {ConversationsComponent} from './components/conversations/conversations.component';
import {ConversationComponent} from './components/conversation/conversation.component';

export const CONVERSATIONS_ROUTES: Routes = [
    {path: '', component: ConversationsComponent}
];
