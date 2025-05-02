import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { Contact } from '../model/contact.model';
import { Group } from '../model/group.model';
import { Chat } from '../model/chat.model';

@Component({
  selector: 'contact-container',
  templateUrl: './contact-container.component.html',
  imports: [NgOptimizedImage, MatIconButton, MatMenuTrigger, MatIcon, MatMenuItem, MatMenu],
  styleUrl: './contact-container.component.scss'
})
export class ContactContainerComponent {
  @Input() chat!: Contact | Group;
  @Output() contactClick = new EventEmitter<Contact | Group>();

  onContactClick() {
    console.log(this.chat);
    this.contactClick.emit(this.chat);
  }

  isContact(chat: Chat): chat is Contact {
    return !chat.is_group;
  }
}
