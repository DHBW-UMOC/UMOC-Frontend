import { Component } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Chat } from '../model/chat.model';
import { Group } from '../model/group.model';

@Component({
  selector: 'app-info-window',
  imports: [],
  templateUrl: './info-window.component.html',
  styleUrl: './info-window.component.scss'
})
export class InfoWindowComponent {
  ownUserID: string = '';

  constructor(protected contactService: ContactService) {
    this.ownUserID = this.contactService.getOwnUserID();
  }

  isContact(chat: Chat): chat is Group {
    return chat.is_group;
  }
}
