import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-input-emojis',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule, PickerComponent],
  templateUrl: './chat-input-emojis.component.html',
  styleUrl: './chat-input-emojis.component.scss'
})
export class ChatInputEmojisComponent {
  @Output() emojiSelected = new EventEmitter<string>();

  showEmojiPicker = false;

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.showEmojiPicker && !this.elementRef.nativeElement.contains(event.target)) {
      this.showEmojiPicker = false;
    }
  }

  toggleEmojiPicker(): void {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any): void {
    this.emojiSelected.emit(event.emoji.native);
    this.showEmojiPicker = false;
  }
}