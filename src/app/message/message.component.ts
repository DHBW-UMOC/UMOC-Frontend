import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Message } from '../model/message.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-message',
  imports: [CommonModule, NgClass, MatIcon],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() message: Message | undefined;
  @Input() currentUser: string | undefined = '';
  @Input() isGroupChat: boolean = false;
  @Output() onDelete = new EventEmitter<string>();

  stringToColour(str: string, minBrightness = 130): string {
    let hash = 0;

    // Generate hash from string
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Extract RGB
    let r = (hash >> 0) & 0xFF;
    let g = (hash >> 8) & 0xFF;
    let b = (hash >> 16) & 0xFF;

    // Calculate brightness
    let brightness = 0.299 * r + 0.587 * g + 0.114 * b;

    // If too dark, scale up RGB proportionally
    if (brightness < minBrightness) {
      const scale = minBrightness / brightness;
      r = Math.min(255, Math.round(r * scale));
      g = Math.min(255, Math.round(g * scale));
      b = Math.min(255, Math.round(b * scale));
    }

    // Return hex color
    return (
      '#' +
      r.toString(16).padStart(2, '0') +
      g.toString(16).padStart(2, '0') +
      b.toString(16).padStart(2, '0')
    );
  }

  formatMessageContent(content: string | undefined): string {
    if (!content) return '';

    const emojiRegex = /(\p{Emoji})/gu;

    return content.replace(emojiRegex, '<span class="emoji">$1</span>');
  }

  deleteMessage() {
    this.onDelete.emit(this.message?.message_id);
  }
}
