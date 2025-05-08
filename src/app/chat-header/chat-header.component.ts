import { Component } from '@angular/core';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-chat-header',
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {
  constructor(private contactService: ContactService) {}

  protected selectedContact = this.contactService.selectedContact;

  getContactImage(): string | undefined {
    const contact = this.selectedContact();
    return contact?.picture_url;
  }
}
