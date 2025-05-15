import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ContactService } from '../services/contact.service';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Group } from '../model/group.model';
import { Contact } from '../model/contact.model';

@Component({
  selector: 'app-own-contact',
  imports: [
    NgOptimizedImage,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './own-contact.component.html',
  styleUrl: './own-contact.component.scss'
})
export class OwnContactComponent {

  constructor(protected contactservice: ContactService) {
  }

  selectSelf(ownContact: Contact | Group) {
    this.contactservice.selectContactToEdit(ownContact);
  }

  ominousMessage() {
    console.log('soon ...');
  }
}
