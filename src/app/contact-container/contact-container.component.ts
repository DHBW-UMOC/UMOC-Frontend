import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgClass, NgOptimizedImage } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { Contact } from '../model/contact.model';
import { Group } from '../model/group.model';
import { ContactStatusDisplay } from '../model/ContactStatusDisplay';

@Component({
  selector: 'contact-container',
  templateUrl: './contact-container.component.html',
  imports: [CommonModule, NgOptimizedImage, MatIconButton, MatMenuTrigger, MatIcon, MatMenuItem, MatMenu, MatMenuModule, NgClass],
  styleUrl: './contact-container.component.scss'
})
export class ContactContainerComponent {
  @Input() chat!: Contact | Group;
  @Output() contactClick = new EventEmitter<Contact | Group>();
  @Output() optionSelect = new EventEmitter<string>();
  @Output() optionSelectGroup = new EventEmitter<string>();
  @Input() known!: boolean;
  protected readonly ContactStatusDisplay = ContactStatusDisplay;

  onContactClick() {
    this.contactClick.emit(this.chat);
  }

  onOptionSelect(value: string) {
    this.optionSelect.emit(value);
  }

  onOptionSelectGroup(value: string) {
    this.optionSelectGroup.emit(value);
  }

  isContact(obj: any): obj is Contact {
    return obj && !obj.is_group;
  }

  isGroup(obj: any): obj is Group {
    return obj && obj.is_group;
  }
}