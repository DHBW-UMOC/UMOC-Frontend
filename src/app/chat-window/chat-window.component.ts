import { Component, effect, signal } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Message } from '../model/message.model';
import { ChatService } from '../services/chat.service';
import { LoginService } from '../services/login.service';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-chat-window',
  imports: [CommonModule, MessageComponent, ChatInputComponent, NgOptimizedImage],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  protected currentUser: string | undefined = this.loginService.getUserID();
  protected selectedContact = this.contactService.selectedContact;
  protected messages = signal<Message[]>([]);

  constructor(private chatService: ChatService,
              private loginService: LoginService,
              private contactService: ContactService
  ) {
    effect(() => {
        if (!this.selectedContact()) return;
        this.chatService.fetchChatHistory(this.selectedContact()!.contactID)
          .subscribe(newMessages => this.messages.set(newMessages));
      }
    );
  }
}
