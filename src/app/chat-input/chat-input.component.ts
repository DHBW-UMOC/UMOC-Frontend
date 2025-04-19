import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatInputEmojisComponent } from '../chat-input-emojis/chat-input-emojis.component';
import { ChatInputExtrasComponent } from '../chat-input-extras/chat-input-extras.component';
import { ContactListService } from '../contact-list/contact-list.service';
import { Contact } from '../model/contact.model';
import { ChatInputService } from './chat-input.service';

@Component({
  selector: 'app-chat-input',
  imports: [ChatInputEmojisComponent, ChatInputExtrasComponent],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent implements OnInit {
  protected selectedContact!: Contact | null;
  @ViewChild('messageInput') messageInput!: ElementRef;

  constructor(
    private contactService: ContactListService,
    private chatInputService: ChatInputService
  ) {
  }

  ngOnInit(): void {
    this.contactService.currentContact$.subscribe((contact: Contact | null) => {
      this.selectedContact = contact;
    });
  }

  saveMessage(messageContent: string) {
    console.log(messageContent);
    if (messageContent.trim()) {
      this.chatInputService.saveMessage(
        this.selectedContact!.contactID,
        messageContent
      ).subscribe({
        next: (response: any) => {
          this.messageInput.nativeElement.value = '';
        //   TODO: show message in chat
        },
        error: (error: any) => {
          console.error('Message send failed', error);
          this.messageInput.nativeElement.value = '';
        }
      });
    }
  }
}
