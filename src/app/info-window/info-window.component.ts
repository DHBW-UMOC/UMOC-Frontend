import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Group } from '../model/group.model';
import { NgOptimizedImage } from '@angular/common';
import { Contact } from '../model/contact.model';
import { MemberContainerComponent } from '../member-container/member-container.component';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-info-window',
  imports: [
    NgOptimizedImage,
    MemberContainerComponent,
    MatFabButton,
    MatIcon,
    MatCardModule
  ],
  templateUrl: './info-window.component.html',
  styleUrl: './info-window.component.scss',
  standalone: true
})
export class InfoWindowComponent {
  ownUserID: string = '';
  isEditing: boolean = false;

  constructor(protected contactService: ContactService) {
    this.ownUserID = this.contactService.getOwnUserID();
  }

  startEditing(): void {
    this.isEditing = true;
  }

  finishEditing(newName: string): void {
    this.isEditing = false;
    const currentChat = this.contactService.showInfoOf();
    if (currentChat && newName.trim() !== '') {
      if (this.isGroup(currentChat)) {
        // Implement group name update logic here
        // this.contactService.updateGroupName(currentChat.contact_id, newName);
      } else if (this.isContact(currentChat)) {
        // Implement contact name update logic here
        // this.contactService.updateContactName(currentChat.contact_id, newName);
      }
    }
  }

  isContact(obj: any): obj is Contact {
    return obj && !obj.is_group;
  }

  isGroup(obj: any): obj is Group {
    return obj && obj.is_group;
  }
}
