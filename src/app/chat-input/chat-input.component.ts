import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ChatInputEmojisComponent } from '../chat-input-emojis/chat-input-emojis.component';
import { ChatInputExtrasComponent } from '../chat-input-extras/chat-input-extras.component';
import { ContactService } from '../services/contact.service';
import { ChatService } from '../services/chat.service';
import { FormsModule } from '@angular/forms';
import { catchError, of, take } from 'rxjs';

@Component({
  selector: 'app-chat-input',
  imports: [ChatInputEmojisComponent, ChatInputExtrasComponent, FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {
  @Input() recipientID = '';
  @ViewChild('messageInput') messageInput!: ElementRef;

  constructor(
    private contactService: ContactService,
    private chatService: ChatService
  ) {
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        event.preventDefault();
        if (this.messageInput.nativeElement.value.trimStart()) {
          this.saveMessage(this.messageInput.nativeElement.value);
          this.messageInput.nativeElement.value = '';
        }
      }
    }
  }

  saveMessage(messageContent: string) {
    this.chatService.saveMessage(
      this.recipientID,
      messageContent.trim()  // Changed from trimStart().trimEnd() to trim()
    ).pipe(
      take(1),
      catchError(() => {
        console.error('Error sending messages');
        return of(null);
      })
    ).subscribe({
      next: (() => {
        console.log('Message sent successfully');
      })
    });
  }
}