import { Injectable, signal } from '@angular/core';
import { Message } from '../model/message.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { finalize, map, Observable } from 'rxjs';
import { LoginService } from './login.service';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  isLoading = signal<boolean>(false);
  currentChatHistory = signal<Message[]>([]);

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private environmentService: EnvironmentService
  ) {
  }

  public getChatHistory(contact_id: string) {
    this.isLoading.set(true);
    this.fetchChatHistory(contact_id);
  }

  public updateChatHistory(contact_id: string) {
    this.fetchChatHistory(contact_id);
  }

  private fetchChatHistory(contact_id: string) {
    this.http.get<any>(
      this.environmentService.getContactMessagesUrl(),
      {
        headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`}),
        params: new HttpParams().append('chat_id', contact_id)
      }
    ).pipe(
      map(response => {
        const messagesData = Array.isArray(response) ? response : (response.messages ? response.messages : []);
        return messagesData.map((message: any) => {
          return new Message(
            message.content,
            message.message_id,
            message.recipient_id,
            message.sender_user_id,
            message.sender_username,
            new Date(message.timestamp),
            message.type
          );
        });
      }),
      finalize(() => this.isLoading.set(false))
    ).subscribe(
      newMessages => this.currentChatHistory.set(newMessages)
    );
  }

  public saveMessage(recipientID: string, message: string): Observable<any> {
    return this.http.post(
      this.environmentService.getSaveMessageUrl(),
      {
        recipient_id: recipientID,
        content: message,
        is_group: false
      },
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.loginService.getAuthToken()}`
        })
      }
    );
  }
}
