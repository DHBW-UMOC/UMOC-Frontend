import { Component, effect, signal } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Message } from '../model/message.model';
import { ChatService } from '../services/chat.service';
import { LoginService } from '../services/login.service';
import { ContactService } from '../services/contact.service';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';

@Component({
  selector: 'app-chat-window',
  imports: [CommonModule, MessageComponent, ChatInputComponent, NgOptimizedImage, ChatHeaderComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  protected currentUser: string | undefined = this.loginService.getUserID();
  protected messages = signal<Message[]>([]);

  constructor(protected chatService: ChatService,
              private loginService: LoginService,
              protected contactService: ContactService
  ) {
    effect(() => {
        if (!this.contactService.selectedContact()) return;
        this.messages.set([]);
        this.chatService.fetchChatHistory(this.contactService.selectedContact()!.contact_id)
          .subscribe(newMessages => this.messages.set(newMessages));
      }
    );
  }
}
