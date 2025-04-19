import { Component, Input } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Message } from '../model/message.model';

@Component({
  selector: 'app-message',
  imports: [CommonModule, NgClass],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() message: Message | undefined;
  @Input() currentUser: string | undefined = '';
}