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
  @Input() isGroupChat: boolean = false;

  stringToColour(str: string): string {
    let hash = 0;
    str.split('').forEach(char => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash)
    })
    let colour = '#'
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff
      colour += value.toString(16).padStart(2, '0')
    }
    return colour
  }
}
