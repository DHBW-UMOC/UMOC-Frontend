import {Component, OnInit} from '@angular/core';
import {MessageComponent} from "../message/message.component";
import {ChatInputComponent} from "../chat-input/chat-input.component";
import {CommonModule} from "@angular/common";
import {Message} from "../model/message.model";
import {ChatService} from "./chat.service";
import {LoginService} from "../login/login.service";
import {ContactListService} from "../contact-list/contact-list.service";
import {Contact} from "../model/contact.model";


@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, MessageComponent, ChatInputComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnInit {
  counter: number = 0;
  protected messages: Array<Message> = [];
  protected selectedContact!: Contact | null;

  constructor(private chatService: ChatService, private loginService: LoginService, private contactService: ContactListService) {
  }

  ngOnInit(): void {
    this.contactService.currentContact$.subscribe(contact => {
      this.counter++;
      console.log("-----------" + this.counter.toString() + contact);
      this.selectedContact = contact;
      this.selectedContact!.userName = "Test" + this.counter.toString();
      if (this.selectedContact !== null) {
        console.log("-----------" + this.counter.toString() + contact);
        this.chatService.fetchChatHistory(this.loginService.sessionID, contact!.userID)
          .subscribe(messages => {
            this.messages = messages;
          });
      }
    });
  }

}
