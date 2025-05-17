import { Component } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { AdBannerComponent } from './ad-banner/ad-banner.component';
import { ContactService } from './services/contact.service';
import { ChatPlaceholderComponent } from './chat-placeholder/chat-placeholder.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { InfoWindowComponent } from './info-window/info-window.component';

@Component({
  selector: 'app-root',
  imports: [ContactListComponent, LoginComponent, AdBannerComponent, ChatPlaceholderComponent, ChatWindowComponent, InfoWindowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UMOC-Frontend';
  adBannerHidden = true;

  constructor(protected loginService: LoginService, protected contactService: ContactService) {
  }

  toggleAdBanner() {
    this.adBannerHidden = !this.adBannerHidden;
  }
}