import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChatInputEmojisComponent } from '../chat-input-emojis/chat-input-emojis.component';
import { ChatInputExtrasComponent } from '../chat-input-extras/chat-input-extras.component';
import { ContactService } from '../services/contact.service';
import { ChatService } from '../services/chat.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { WsService } from '../services/ws.service';

@Component({
  selector: 'app-chat-input',
  imports: [
    ChatInputEmojisComponent,
    ChatInputExtrasComponent,
    FormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent implements AfterViewInit {
  @Input() recipientID = '';
  @ViewChild('messageInput') messageInput!: ElementRef;

  constructor(
    private contactService: ContactService,
    private chatService: ChatService,
    private websocket: WsService
  ) {
  }

  ngAfterViewInit() {
    this.adjustTextareaHeight();
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault();
        if (this.messageInput.nativeElement.value.trimStart()) {
          this.saveMessage(this.messageInput.nativeElement.value);
          this.messageInput.nativeElement.value = '';
          this.adjustTextareaHeight();
        }
      } else {
        this.adjustTextareaHeight();
      }
    }
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key !== "Enter") {
      this.websocket.sendMessageTooEarly(this.messageInput.nativeElement.value);
    }
  }

  adjustTextareaHeight() {
    const textarea = this.messageInput.nativeElement;
    textarea.style.height = '0';
    const newHeight = Math.min(textarea.scrollHeight, 180);
    textarea.style.height = newHeight + 'px';
  }

  saveMessage(messageContent: string) {
    this.chatService.saveMessage(
      this.recipientID,
      messageContent.trim()
    ).subscribe(() => this.chatService.updateChatHistory(this.recipientID));
  }
}