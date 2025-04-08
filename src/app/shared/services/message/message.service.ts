import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Message} from "postcss";
import {environment} from "../../../../environments/environment";

/**
 * Service responsible for handling message-related operations.
 * Provides methods to retrieve and send messages via HTTP requests.
 * Can be injected into other components or services as needed.
 */
@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = environment.backendHost + '/api/messages';

  constructor(private http: HttpClient) {}

  /**
   * Retrieves an array of messages for a specific conversation.
   *
   * @return {Observable<Message[]>} An observable that emits an array of messages.
   * @param params
   */
  getMessages(params: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/conversation`, params);
  }

  /**
   * Sends a message to the specified API endpoint.
   *
   * @param {Message} message - The message object to be sent.
   * @return {Observable<Message>} An observable that emits the response message.
   */
  sendMessage(message: any): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, message);
  }
}
