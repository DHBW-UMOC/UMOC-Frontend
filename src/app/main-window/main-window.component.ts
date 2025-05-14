import { Component } from '@angular/core';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { InfoWindowComponent } from '../info-window/info-window.component';
import { ChatPlaceholderComponent } from '../chat-placeholder/chat-placeholder.component';
import { ContactService } from '../services/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-window',
  imports: [CommonModule, ChatWindowComponent, InfoWindowComponent, ChatPlaceholderComponent],
  templateUrl: './main-window.component.html',
  styleUrl: './main-window.component.scss'
})
export class MainWindowComponent {
  constructor(protected contactService: ContactService) {}
}
