import { Component } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { NgOptimizedImage } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  imports: [ContactListComponent, ChatWindowComponent, LoginComponent, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UMOC-Frontend';

  constructor(protected loginService: LoginService) {
  }

  logout() {
    this.loginService.logout();
  }
}