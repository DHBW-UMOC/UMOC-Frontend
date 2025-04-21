import { Injectable } from '@angular/core';
import { Message } from '../model/message.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LoginService } from './login.service';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private environmentService: EnvironmentService
  ) {
  }

  public fetchChatHistory(contactID: string): Observable<Message[]> {
    return this.http.get<any>(
      this.environmentService.getContactMessagesUrl(),
      {
        headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`}),
        params: new HttpParams().append('contactID', contactID)
      }
    ).pipe(
      map(response => {
        const messagesData = Array.isArray(response) ? response : (response.messages ? response.messages : []);
        return messagesData.map((message: any) => {
          return new Message(
            message.message_id,
            message.content,
            new Date(message.timestamp),
            message.sender_user_id
          );
        });
      })
    );
  }

  public saveMessage(recipientID: string, message: string): Observable<any> {
    return this.http.post(
      this.environmentService.getSaveMessageUrl(),
      {
        recipientID: recipientID,
        content: message,
        isGroup: false
      },
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.loginService.getAuthToken()}`
        })
      }
    );
  }
}
