import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  // Base API URL - should come from environment in a real app
  private apiUrl = 'https://api.umoc.chat';

  // Authentication endpoints
  getLoginUrl(): string {
    return `${this.apiUrl}/login`;
  }

  getLogoutUrl(): string {
    return `${this.apiUrl}/logout`;
  }

  getRegisterUrl(): string {
    return `${this.apiUrl}/register`;
  }

  // Contact management endpoints
  getContactsUrl(): string {
    return `${this.apiUrl}/getContacts`;
  }

  getAddContactUrl(): string {
    return `${this.apiUrl}/addContact`;
  }

  getChangeContactUrl(): string {
    return `${this.apiUrl}/changeContact`;
  }

  // Messaging endpoints
  getContactMessagesUrl(): string {
    return `${this.apiUrl}/getContactMessages`;
  }

  getSaveMessageUrl(): string {
    return `${this.apiUrl}/saveMessage`;
  }

  // Utility endpoints
  getDebugContactsUrl(): string {
    return `${this.apiUrl}/debugContacts`;
  }
}
