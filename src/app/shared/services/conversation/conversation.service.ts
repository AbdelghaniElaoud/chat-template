import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../../environments/environment";
import {Conversation} from "../../models/conversation.model";

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private apiUrl =environment.backendHost + '/api/conversations';

  constructor(private http:HttpClient) { }

  getConversationsBetweenUsers(userId1: number | null, userId2: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/between/${userId1}/${userId2}`);
  }

  getAllConversations(): Observable<Conversation[]> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getConversationByCode(conversationCode : number): Observable<Conversation> {
    return this.http.get<any>(`${this.apiUrl}/${conversationCode}`);
  }
}
