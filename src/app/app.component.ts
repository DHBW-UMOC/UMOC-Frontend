import { Component, ElementRef, HostListener } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { AdBannerComponent } from './ad-banner/ad-banner.component';
import { ContactService } from './services/contact.service';
import { ChatPlaceholderComponent } from './chat-placeholder/chat-placeholder.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { InfoWindowComponent } from './info-window/info-window.component';
import { UmocService } from './services/umoc.service';
import { UmocShopComponent } from './umoc-shop/umoc-shop.component';

@Component({
  selector: 'app-root',
  imports: [ContactListComponent, LoginComponent, AdBannerComponent, ChatPlaceholderComponent, ChatWindowComponent, InfoWindowComponent, UmocShopComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UMOC-Frontend';

  constructor(
    protected loginService: LoginService,
    protected contactService: ContactService,
    protected umocService: UmocService,
    private elementRef: ElementRef
  ) {
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.contactService.showInfoOf()) {
      const infoWindowElement = this.elementRef.nativeElement.querySelector('app-info-window');
      if (infoWindowElement && !infoWindowElement.contains(event.target as Node)) {
        this.contactService.showInfoOf.set(null);
      }
    }
  }
}