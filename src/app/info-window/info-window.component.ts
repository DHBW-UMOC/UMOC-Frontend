import { Component } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Group } from '../model/group.model';
import { NgOptimizedImage } from '@angular/common';
import { Contact } from '../model/contact.model';
import { MemberContainerComponent } from '../member-container/member-container.component';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-info-window',
  imports: [
    NgOptimizedImage,
    MemberContainerComponent,
    MatFabButton,
    MatIcon
  ],
  templateUrl: './info-window.component.html',
  styleUrl: './info-window.component.scss'
})
export class InfoWindowComponent {
  ownUserID: string = '';

  constructor(protected contactService: ContactService) {
    this.ownUserID = this.contactService.getOwnUserID();
  }

  isContact(obj: any): obj is Contact {
    return obj && !obj.is_group;
  }

  isGroup(obj: any): obj is Group {
    return obj && obj.is_group;
  }
}
