import { Component } from '@angular/core';
import { ContactContainerComponent } from '../contact-container/contact-container.component';
import { ContactListSearchBarComponent } from '../contact-list-search-bar/contact-list-search-bar.component';
import { ContactListHeaderComponent } from '../contact-list-header/contact-list-header.component';
import { ContactService } from '../services/contact.service';
import { Contact } from '../model/contact.model';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-contact-list',
  imports: [
    ContactContainerComponent,
    ContactListSearchBarComponent,
    ContactListHeaderComponent,
    CommonModule
  ],
  providers: [LoginService],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  protected contacts$ = this.contactService.fetchContacts();

  constructor(
    private contactService: ContactService
  ) {
  }

  openChat(contact: Contact) {
    this.contactService.selectContact(contact);
  }
}
