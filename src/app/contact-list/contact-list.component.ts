import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { ContactContainerComponent } from '../contact-container/contact-container.component';
import { ContactService } from '../services/contact.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LoginService } from '../services/login.service';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { OwnContactComponent } from '../own-contact/own-contact.component';
import { Contact } from '../model/contact.model';
import { Group } from '../model/group.model';
import { UmocService } from '../services/umoc.service';

@Component({
  selector: 'app-contact-list',
  imports: [
    ContactContainerComponent,
    CommonModule,
    NgOptimizedImage,
    MatFabButton,
    MatIcon,
    OwnContactComponent
  ],
  providers: [LoginService],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {
  @ViewChild('searchBox') searchBox!: ElementRef<HTMLInputElement>;
  searchResults = signal<Contact[]>([]);
  filteredContacts = signal<(Contact | Group)[]>([]);

  constructor(
    protected contactService: ContactService,
    private umocService: UmocService
  ) {
  }

  openChat(chat: Contact | Group) {
    this.contactService.selectContact(chat);
    this.umocService.showShop.set(false);
    if (this.searchBox) {
      this.searchBox.nativeElement.value = '';
      this.searchResults.set([]);
    }
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

  searchContacts(searchTerm: string) {
    if (searchTerm && searchTerm.length > 0) {
      const term = searchTerm.toLowerCase();
      this.filteredContacts.set(
        this.contactService.contacts().filter(contact =>
          contact.name.toLowerCase().startsWith(term)
        )
      );
      this.contactService.fetchNewContacts(searchTerm).subscribe(
        (contacts) => {
          const existingContactIds = new Set(
            this.contactService.contacts().map(contact => contact.contact_id)
          );
          const uniqueContacts = contacts.filter(
            contact => !existingContactIds.has(contact.contact_id)
          );

          this.searchResults.set(uniqueContacts);
        },
        () => {
          this.searchResults.set([]);
        }
      );
    } else {
      this.filteredContacts.set([]);
      this.searchResults.set([]);
    }
  }

  createNewGroup() {
    this.contactService.createGroup().subscribe(
      (response) => this.contactService.showInfoOf.set(this.contactService.contacts().find(contact => contact.contact_id == response)!)
    );
  }
}