import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { Contact } from '../model/contact.model';
import { Group } from '../model/group.model';

@Component({
  selector: 'contact-container',
  templateUrl: './contact-container.component.html',
  imports: [NgOptimizedImage, MatIconButton, MatMenuTrigger, MatIcon, MatMenuItem, MatMenu],
  styleUrl: './contact-container.component.scss'
})
export class ContactContainerComponent {
  @Input() chat!: Contact | Group;
  @Output() contactClick = new EventEmitter<Contact | Group>();
  @Output() optionSelect = new EventEmitter<string>();
  @Output() optionSelectGroup = new EventEmitter<string>();

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