import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chat-input-extras',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './chat-input-extras.component.html',
  styleUrl: './chat-input-extras.component.scss'
})
export class ChatInputExtrasComponent {
}
