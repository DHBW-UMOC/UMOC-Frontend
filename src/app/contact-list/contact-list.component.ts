import {Component, OnInit} from '@angular/core';
import { ContactContainerComponent } from "../contact-container/contact-container.component";
import { ContactListSearchBarComponent } from "../contact-list-search-bar/contact-list-search-bar.component";
import { ContactListHeaderComponent } from "../contact-list-header/contact-list-header.component";
import {ContactListService} from "./contact-list.service";
import {Contact} from "../model/contact.model";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [ContactContainerComponent, ContactListSearchBarComponent, ContactListHeaderComponent, CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit {

  protected contacts: Array<Contact> = [];

  constructor(private contactService: ContactListService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.fetchContacts("session")
  }

}
