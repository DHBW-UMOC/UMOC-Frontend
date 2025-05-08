import { Component } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { AdBannerComponent } from "./ad-banner/ad-banner.component";

@Component({
  selector: 'app-root',
  imports: [ContactListComponent, ChatWindowComponent, LoginComponent, AdBannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UMOC-Frontend';
  adBannerHidden = true; // Add this property

  constructor(protected loginService: LoginService) {
  }

  logout() {
    this.loginService.logout();
  }

  toggleAdBanner() {
    this.adBannerHidden = !this.adBannerHidden;
  }
}