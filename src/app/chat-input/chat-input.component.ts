import { Component } from '@angular/core';
import { ChatInputEmojisComponent } from "../chat-input-emojis/chat-input-emojis.component";
import { ChatInputExtrasComponent } from "../chat-input-extras/chat-input-extras.component";

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [ChatInputEmojisComponent, ChatInputExtrasComponent],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss'
})
export class ChatInputComponent {

}
