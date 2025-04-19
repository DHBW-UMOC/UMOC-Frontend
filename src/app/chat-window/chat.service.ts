import { Injectable } from "@angular/core";
import { Message } from "../model/message.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import {LoginService} from "../login/login.service";
import {PRODUCTION} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(
      private http: HttpClient,
      private loginService: LoginService
  ) {}

  public fetchChatHistory(contactID: string): Observable<Message[]> {
    return this.http.get<any>(
        `${PRODUCTION}/getContactMessages`,
      {
          headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`}),
          params: new HttpParams().append('contactID', contactID)
      }
    ).pipe(
      map(response => {
        console.log('API Response:', response);
        // Handle both array responses and object responses with a messages property
        const messagesData = Array.isArray(response) ? response : 
                           (response.messages ? response.messages : []);
        
        console.log('Messages data to process:', messagesData);
        return messagesData.map((message: any) => {
          // Detailed logging to understand the message structure
          console.log('Message object structure:', Object.keys(message));
          
          // Try to match the API format with our Message model
          const content = message.content || message.message || '';
          const timestamp = message.send_at || message.timeStamp || new Date();
          const senderId = message.sender_id || message.sender_user_id || message.owner || '';
          
          console.log(`Creating message: content=${content}, timestamp=${timestamp}, senderId=${senderId}`);
          
          return new Message(content, new Date(timestamp), senderId);
        });
      }),
      catchError(error => {
        console.error('Error fetching messages:', error);
        return of([]);
      })
    );
  }
}
