import {Component, OnInit} from '@angular/core';
import { MessageComponent } from "../message/message.component";
import { ChatInputComponent } from "../chat-input/chat-input.component";
import {CommonModule} from "@angular/common";
import {Message} from "../model/message.model";
import {ChatService} from "./chat.service";


@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, MessageComponent, ChatInputComponent],

  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent implements OnInit {

  protected messages: Array<Message> = [];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messages = this.chatService.fetchChatHistory("session")
  }

}
