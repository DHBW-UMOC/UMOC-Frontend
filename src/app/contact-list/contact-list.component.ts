import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { ContactContainerComponent } from "../contact-container/contact-container.component";
import { ContactListSearchBarComponent } from "../contact-list-search-bar/contact-list-search-bar.component";
import { ContactListHeaderComponent } from "../contact-list-header/contact-list-header.component";
import { ContactListService } from "./contact-list.service";
import { Contact } from "../model/contact.model";
import { CommonModule } from "@angular/common";
import { LoginService } from "../login/login.service";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    ContactContainerComponent,
    ContactListSearchBarComponent,
    ContactListHeaderComponent,
    CommonModule,
    HttpClientModule
  ],
  providers: [LoginService],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit {
  protected contacts: Array<Contact> = [];

  constructor(
    private contactService: ContactListService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.contacts = this.contactService.fetchContacts(this.loginService.sessionID);
  }

  openChat(contact: Contact) {
    this.contactService.selectContact(contact);
  }
}
