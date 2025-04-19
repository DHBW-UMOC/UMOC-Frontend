import { Injectable } from '@angular/core';
import { CURRENT_ENVIRONMENT } from '../environments/environments';

// Coose environment out of the enum
@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private apiUrl = CURRENT_ENVIRONMENT;

  // Authentication Endpoints
  getLoginUrl(): string {
    return `${this.apiUrl}/login`;
  }

  getLogoutUrl(): string {
    return `${this.apiUrl}/logout`;
  }

  getRegisterUrl(): string {
    return `${this.apiUrl}/register`;
  }

  // Contact Management Endpoints
  getContactsUrl(): string {
    return `${this.apiUrl}/getContacts`;
  }

  public getAddContactUrl(): string {
    return `${this.apiUrl}/addContact`;
  }

  getChangeContactUrl(): string {
    return `${this.apiUrl}/changeContact`;
  }

  // Messaging Endpoints
  getContactMessagesUrl(): string {
    return `${this.apiUrl}/getContactMessages`;
  }

  getSaveMessageUrl(): string {
    return `${this.apiUrl}/saveMessage`;
  }

  // Utility Endpoints
  getDebugContactsUrl(): string {
    return `${this.apiUrl}/debugContacts`;
  }
}