import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
export class ChatInputEmojisComponent implements OnChanges {
  @Input() disabled = false;
  @Output() emojiSelected = new EventEmitter<string>();

  showEmojiPicker = false;

  constructor(private elementRef: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabled'] && changes['disabled'].currentValue === true && this.showEmojiPicker) {
      this.showEmojiPicker = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.showEmojiPicker && !this.elementRef.nativeElement.contains(event.target)) {
      this.showEmojiPicker = false;
    }
  }

  toggleEmojiPicker(): void {
    if (this.disabled) return;
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any): void {
    if (this.disabled) return;
    this.emojiSelected.emit(event.emoji.native);
    this.showEmojiPicker = false;
  }
}