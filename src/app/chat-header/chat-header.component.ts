import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../model/contact.model';
import { Group } from '../model/group.model';

@Component({
  selector: 'app-chat-header',
  imports: [],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss'
})
export class ChatHeaderComponent {
  @Input() selectedUser: Contact | Group | null = null;
  @Output() infoSelect = new EventEmitter<Contact | Group>();

  onInfoSelect() {
    this.infoSelect.emit(this.selectedUser!);
  }
}
