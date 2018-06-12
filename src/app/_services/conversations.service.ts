import {Injectable} from '@angular/core';
import {URL_CONSTANTS} from '../app.url';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ConversationsService {

    private conversationsUrl: string = URL_CONSTANTS.conversations;

    constructor(private http: HttpClient) {
    }

    /**
     * POST: creates a new conversation or broadcast
     * @param body - Broadcast params
     * @returns {Promise<any>}
     */
    createSystemBroadcasts(body) {
        return this.http.post(`${this.conversationsUrl}/create-system-broadcasts`, body).toPromise<any>();
    }

    /**
     * POST: retrieves list of conversations by specified filter
     * @param body - Filters
     * @returns {Promise<any>}
     */
    getListOfConversations(body) {
        return this.http.post(`${this.conversationsUrl}/view`, body).toPromise<any>();
    }

    /**
     * DELETE: deletes a conversation with specified id
     * @param conversationId - Conversation id
     * @returns {Promise<any>}
     */
    deleteConversation(conversationId) {
        return this.http.delete(`${this.conversationsUrl}/${conversationId}`).toPromise<any>();
    }

    /**
     * POST: retrieves list of messages for specified conversation
     * @param conversationId - Conversation id
     * @param body - Filters
     * @returns {Promise<any>}
     */
    getMessagesForSpecifiedConversation(conversationId, body) {
        return this.http.post(`${this.conversationsUrl}/${conversationId}/messages/view`, body).toPromise<any>();
    }

    /**
     * POST: Marks message in specified conversation as read
     * @param messageId - Id of message to mark
     * @param conversationId - Conversation id
     * @param {{}} body
     * @returns {Promise<any>}
     */
    markMessageAsRead(messageId, conversationId, body = {}) {
        return this.http.post(`{this.conversationsUrl}/${conversationId}/messages/${messageId}/mark-as-read`, body).toPromise<any>();
    }

    /**
     * POST: Writes a message as participant of the specified conversation
     * @param conversationId Conversation id
     * @param body - Text of message
     * @returns {Promise<any>}
     */
    writeMessageInSpecifiedConversation(conversationId, body) {
        return this.http.post(`${this.conversationsUrl}/${conversationId}/messages`, body).toPromise<any>();
    }
}
