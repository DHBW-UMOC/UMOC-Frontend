import { Component } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { CommonModule } from '@angular/common';
import { Message } from '../model/message.model';
import { ChatService } from '../services/chat.service';
import { LoginService } from '../services/login.service';
import { ContactService } from '../services/contact.service';
import { Contact } from '../model/contact.model';
import { Observable, of, switchMap } from 'rxjs';

@Component({
    selector: 'app-chat-window',
    imports: [CommonModule, MessageComponent, ChatInputComponent],
    templateUrl: './chat-window.component.html',
    styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  protected messages$: Observable<Message[]> = this.contactService.currentContact$.pipe(
    switchMap((contact: Contact | null) => {
      if (contact) {
        console.log('Fetching messages for contact:', contact.userName);
        return this.chatService.fetchChatHistory(contact.contactID);
      }
      return of([]);
    })
  );
  protected selectedContact$ = this.contactService.currentContact$;
  protected currentUser: string | undefined = '';

  constructor(private chatService: ChatService, private loginService: LoginService, private contactService: ContactService) {
    this.currentUser = this.loginService.getUserID();
  }
}
