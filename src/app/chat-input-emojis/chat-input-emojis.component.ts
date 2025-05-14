import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat-input-emojis',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './chat-input-emojis.component.html',
  styleUrl: './chat-input-emojis.component.scss'
})
export class ChatInputEmojisComponent {
}
