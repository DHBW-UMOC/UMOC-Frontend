import { Component } from '@angular/core';
import { MessageComponent } from "../message/message.component";
import { ChatInputComponent } from "../chat-input/chat-input.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [MessageComponent, ChatInputComponent, NgFor],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss'
})
export class ChatWindowComponent {

}
