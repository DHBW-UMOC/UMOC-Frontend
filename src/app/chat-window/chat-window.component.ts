import { Component, effect, signal, ViewChild, ElementRef } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Message } from '../model/message.model';
import { ChatService } from '../services/chat.service';
import { ContactService } from '../services/contact.service';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';

@Component({
  selector: 'app-chat-window',
  imports: [CommonModule, MessageComponent, ChatInputComponent, NgOptimizedImage, ChatHeaderComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  protected currentUser: string = this.contactService.getOwnUserID();
  protected messages = signal<Message[]>([]);
  protected useAltBackground = false;

  toggleBackground() {
    this.useAltBackground = !this.useAltBackground;
  }

  constructor(protected chatService: ChatService,
              protected contactService: ContactService
  ) {
    effect(() => {
        if (!this.contactService.selectedContact()) return;
        this.messages.set([]);
        this.chatService.fetchChatHistory(this.contactService.selectedContact()!.contact_id)
          .subscribe(newMessages => {
            this.messages.set(newMessages);
            setTimeout(() => this.scrollToBottom(), 0);
          });
      }
    );
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
