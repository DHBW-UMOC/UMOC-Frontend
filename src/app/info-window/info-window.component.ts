import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Group } from '../model/group.model';
import { NgOptimizedImage } from '@angular/common';
import { Contact } from '../model/contact.model';
import { MemberContainerComponent } from '../member-container/member-container.component';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ContactContainerComponent } from '../contact-container/contact-container.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-info-window',
  imports: [
    NgOptimizedImage,
    MemberContainerComponent,
    MatFabButton,
    MatIcon,
    MatCardModule,
    MatIconButton,
    ContactContainerComponent
  ],
  templateUrl: './info-window.component.html',
  styleUrl: './info-window.component.scss',
  standalone: true
})
export class InfoWindowComponent {
  @ViewChild('searchBox') searchBox!: ElementRef<HTMLInputElement>;
  searchResults = signal<Contact[]>([]);
  ownUserID: string = '';
  isEditing: boolean = false;

  constructor(protected contactService: ContactService, private loginService: LoginService) {
    this.ownUserID = this.contactService.getOwnUserID();
  }

  logout() {
    this.loginService.logout();
  }

  startEditing(): void {
    this.isEditing = true;
  }

  finishEditing(contact_id: string, newName: string): void {
    this.isEditing = false;
    const currentChat = this.contactService.showInfoOf();
    if (currentChat && newName.trim() !== '') {
      if (this.isGroup(currentChat)) {
        this.contactService.changeGroup('name', contact_id, newName);
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

  addMember($event: Contact | Group) {
    if (this.isContact($event)) {
      this.contactService.addMember(this.contactService.showInfoOf()?.contact_id!, $event.contact_id);
      this.searchBox.nativeElement.value = '';
      this.searchResults.set([]);
    }
  }

  searchNewMembers(searchTerm: string) {
    if (searchTerm && searchTerm.length > 0) {
      this.contactService.fetchNewContacts(searchTerm).subscribe(
        (members) => {
          const currentGroup = this.contactService.showInfoOf();
          if (this.isGroup(currentGroup)) {
            const existingMemberIds = new Set(
              currentGroup.members.map(member => member.user_id)
            );
            const uniqueMembers = members.filter(
              contact => !existingMemberIds.has(contact.contact_id)
            );

            this.searchResults.set(uniqueMembers);
          }
        },
        () => {
          console.error('error searching members');
          this.searchResults.set([]);
        }
      );
    } else {
      this.searchResults.set([]);
    }
  }
}
