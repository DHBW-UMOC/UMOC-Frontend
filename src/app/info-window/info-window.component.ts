import { Component } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Group } from '../model/group.model';
import { NgOptimizedImage } from '@angular/common';
import { Contact } from '../model/contact.model';
import { MemberContainerComponent } from '../member-container/member-container.component';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-info-window',
  imports: [
    NgOptimizedImage,
    MemberContainerComponent,
    MatFabButton,
    MatIcon,
    MatCardModule,
    MatIconButton
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

  finishEditing(contact_id: string, newName: string): void {
    this.isEditing = false;
    const currentChat = this.contactService.showInfoOf();
    if (currentChat && newName.trim() !== '') {
      if (this.isGroup(currentChat)) {
        this.contactService.changeGroup("name", contact_id, newName)
      } else if (this.isContact(currentChat)) {
        // Implement contact name update logic here
        // this.contactService.updateContactName(currentChat.contact_id, newName);
      }
    }
  }

  closeInfoWindow(): void {
    this.contactService.hideInfo();
  }

  isContact(obj: any): obj is Contact {
    return obj && !obj.is_group;
  }

  isGroup(obj: any): obj is Group {
    return obj && obj.is_group;
  }

  canEdit(): boolean {
    const currentChat = this.contactService.showInfoOf();
    if (this.isGroup(currentChat)) {
      return currentChat.am_admin;
    } else {
      return currentChat!.contact_id == this.ownUserID;
    }
  }

  onAdminChange($event: string, group_id: string, user_id: string) {
    this.contactService.changeGroup($event, group_id, user_id);
  }

  onRemoveMember(group_id: string, user_id: string) {
    this.contactService.removeMember(group_id, user_id);
  }

  deleteGroup(group_id: string) {
    this.contactService.deleteGroup(group_id);
  }
}
