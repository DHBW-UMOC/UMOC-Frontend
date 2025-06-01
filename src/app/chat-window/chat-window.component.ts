import { Component, effect, ElementRef, ViewChild } from '@angular/core';
import { MessageComponent } from '../message/message.component';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChatService } from '../services/chat.service';
import { ContactService } from '../services/contact.service';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { UmocService } from '../services/umoc.service';
import { WsService } from '../services/ws.service';

@Component({
  selector: 'app-chat-window',
  imports: [CommonModule, MessageComponent, ChatInputComponent, NgOptimizedImage, ChatHeaderComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  protected currentUser: string = this.contactService.getOwnUserID();

  constructor(
    protected chatService: ChatService,
    protected contactService: ContactService,
    protected umocService: UmocService,
    protected websocket: WsService
  ) {
    effect(() => {
        if (!this.contactService.selectedContact()) return;
        this.chatService.currentChatHistory.set([]);
        this.chatService.getChatHistory(this.contactService.selectedContact()!.contact_id);
        setTimeout(() => this.scrollToBottom(), 0);
      }
    );
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
    }
  }
}
