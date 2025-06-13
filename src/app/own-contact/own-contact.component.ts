import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ContactService } from '../services/contact.service';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Group } from '../model/group.model';
import { Contact } from '../model/contact.model';
import { UmocService } from '../services/umoc.service';

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

  constructor(
    protected contactservice: ContactService,
    protected umocService: UmocService
  ) {
  }

  selectSelf(ownContact: Contact | Group, $event: MouseEvent) {
    $event.stopPropagation()
    if (this.contactservice.showInfoOf()?.contact_id == this.contactservice.self()?.contact_id) {
      this.contactservice.showInfoOf.set(null);
    } else {
      this.contactservice.selectContactToEdit(ownContact);
    }
  }

  toggleShop() {
    this.umocService.toggleShop()
  }
}
