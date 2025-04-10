import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatInputEmojisComponent } from "../chat-input-emojis/chat-input-emojis.component";
import { ChatInputExtrasComponent } from "../chat-input-extras/chat-input-extras.component";
import { ContactListService } from "../contact-list/contact-list.service";
import { Contact } from "../model/contact.model";
import { ChatInputService } from "./chat-input.service";

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [ChatInputEmojisComponent, ChatInputExtrasComponent],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent implements OnInit {
  protected selectedContact!: Contact | null;
  @ViewChild('messageInput') messageInput!: ElementRef;

  constructor(private contactService: ContactListService, private chatInputService: ChatInputService) {
  }

  ngOnInit(): void {
    this.contactService.currentContact$.subscribe((contact: Contact | null) => {
      this.selectedContact = contact;
    });
  }

  saveMessage(messageContent: string) {
    console.log(messageContent);
    console.log("onClick() -------------------");
    if (messageContent.trim()) {
      this.chatInputService.saveMessage(
        "00000000-0000-0000-1111-000000000001", //TODO: IIIIINSANE Technical Debt
        this.selectedContact!.userID,
        messageContent
      ).subscribe({
        next: (response: any) => {
          this.messageInput.nativeElement.value = '';
        },
        error: (error: any) => {
          console.error('Message send failed', error);
          this.messageInput.nativeElement.value = '';
        }
      });
    }
  }
}
