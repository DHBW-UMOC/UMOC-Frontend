import { Component } from '@angular/core';
import { ContactContainerComponent } from '../contact-container/contact-container.component';
import { ContactService } from '../services/contact.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoginService } from '../services/login.service';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { OwnContactComponent } from '../own-contact/own-contact.component';
import { Contact } from '../model/contact.model';
import { Group } from '../model/group.model';

@Component({
  selector: 'app-contact-list',
  imports: [
    ContactContainerComponent,
    CommonModule,
    NgOptimizedImage,
    MatFabButton,
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatIconButton,
    OwnContactComponent
  ],
  providers: [LoginService],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  constructor(
    protected contactService: ContactService
  ) {
  }

  openChat(chat: Contact | Group) {
    this.contactService.selectContact(chat);
  }

  selectOption(user_id: string, $option: string) {
    this.contactService.changeContactStatus(user_id, $option);
  }

  selectOptionGroup(contact: Contact | Group, $event: string) {
    if ($event == 'edit') {
      this.contactService.showInfoOf.set(contact);
    } else if ($event == 'leave') {
      this.contactService.leaveGroup(contact.contact_id);
    }
  }
}
