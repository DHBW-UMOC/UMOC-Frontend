import { Component } from '@angular/core';
import { ContactContainerComponent } from '../contact-container/contact-container.component';
import { ContactListSearchBarComponent } from '../contact-list-search-bar/contact-list-search-bar.component';
import { ContactListHeaderComponent } from '../contact-list-header/contact-list-header.component';
import { ContactService } from '../services/contact.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoginService } from '../services/login.service';
import { Chat } from '../model/chat.model';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-contact-list',
  imports: [
    ContactContainerComponent,
    ContactListSearchBarComponent,
    ContactListHeaderComponent,
    CommonModule,
    NgOptimizedImage,
    MatFabButton,
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatIconButton
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

  openChat(chat: Chat) {
    this.contactService.selectContact(chat);
  }
}
