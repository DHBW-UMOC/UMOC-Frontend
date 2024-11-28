import { Component } from '@angular/core';
import { ContactListComponent } from "../contact-list/contact-list.component";
import { ChatWindowComponent } from "../chat-window/chat-window.component";

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [ContactListComponent, ChatWindowComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss'
})
export class ChatsComponent {

}
