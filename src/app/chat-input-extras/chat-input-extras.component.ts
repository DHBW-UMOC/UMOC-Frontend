import { Component, effect } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UmocService } from '../services/umoc.service';
import { ContactService } from '../services/contact.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Group } from '../model/group.model';
import { Contact } from '../model/contact.model';
import { Member } from '../model/member.model';
import { Item } from '../model/item.model';
import { ItemNameDisplay } from '../model/ItemNameDisplay';

@Component({
  selector: 'app-chat-input-extras',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    NgOptimizedImage
  ],
  templateUrl: './chat-input-extras.component.html',
  styleUrl: './chat-input-extras.component.scss'
})
export class ChatInputExtrasComponent {
  isPopupVisible = false;
  inventoryList: Item[] = [];
  userList: (Contact | Group | Member)[] = [];
  selectedItem: string | null = null;
  selectedUser: string | null = null;
  protected readonly ItemNames = ItemNameDisplay;

  constructor(
    protected contactService: ContactService,
    protected umocService: UmocService
  ) {
    effect(() => {
      this.inventoryList = this.umocService.inventory();
      const selectedContact = this.contactService.selectedContact();
      if (this.isGroup(selectedContact)) {
        this.userList = selectedContact.members;
      } else {
        this.userList = [this.contactService.self()!, selectedContact!];
      }
    });
  }

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  selectListItem(listNumber: number, selection: string) {
    if (listNumber == 1) {
      this.selectedUser = this.selectedUser == selection ? null : selection;
    } else if (listNumber == 2) {
      this.selectedItem = this.selectedItem == selection ? null : selection;
    }
  }

  isGroup(obj: any): obj is Group {
    return obj && obj.is_group;
  }

  useItem() {
    this.umocService.useItem(this.selectedItem!, this.selectedUser!);
    this.selectedItem = null;
    this.selectedUser = null;
    this.isPopupVisible = false;
  }
}