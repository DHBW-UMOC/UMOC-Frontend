import { Component, OnInit } from '@angular/core';
import { MessageComponent } from "../message/message.component";
import { ChatInputComponent } from "../chat-input/chat-input.component";
import { CommonModule } from "@angular/common";
import { Message } from "../model/message.model";
import { ChatService } from "./chat.service";
import { LoginService } from "../login/login.service";
import { ContactListService } from "../contact-list/contact-list.service";
import { Contact } from "../model/contact.model";

@Component({
    selector: 'app-chat-window',
    imports: [CommonModule, MessageComponent, ChatInputComponent],
    templateUrl: './chat-window.component.html',
    styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnInit {
  protected messages: Array<Message> = [];
  protected selectedContact!: Contact | null;

  constructor(private chatService: ChatService, private loginService: LoginService, private contactService: ContactListService) {
  }

  ngOnInit(): void {
    this.contactService.currentContact$.subscribe((contact: Contact | null) => {
      this.selectedContact = contact;
      if (this.selectedContact) {
        console.log('Fetching messages for contact:', this.selectedContact);
        this.chatService.fetchChatHistory(contact!.contactID)
          .subscribe({
            next: (messages: Message[]) => {
              console.log('Received messages:', messages);
              this.messages = messages;
            },
            error: (error) => {
              console.error('Error loading messages:', error);
              this.messages = [];
            }
          });
      } else {
        this.messages = [];
      }
    });
  }
}
