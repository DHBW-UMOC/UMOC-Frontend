import { Component, Input } from '@angular/core';
import { Message } from "../model/message.model";
import { CommonModule, NgClass, NgIf, DatePipe } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, NgClass, NgIf, DatePipe],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() message!: Message;
  @Input() isSent: string | undefined = "";

  // Helper method to check if a message is valid
  isValidMessage(): boolean {
    return !!this.message && !!this.message.message;
  }
}
