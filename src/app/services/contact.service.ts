import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../model/contact.model';
import { Group } from '../model/group.model';
import { finalize, map, Observable } from 'rxjs';
import { LoginService } from './login.service';
import { EnvironmentService } from './environment.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Chat } from '../model/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private environmentService: EnvironmentService
  ) {
  }

  isLoading = signal(false);
  selectedContact = signal<Chat | null>(null);
  contacts = toSignal(this.fetchContacts(), {initialValue: []});

  selectContact(chat: Chat) {
    this.selectedContact.set(chat);
  }

  public fetchContacts(): Observable<Contact[]> {
    this.isLoading.set(true);
    return this.http.get<any>(
      this.environmentService.getContactsUrl(),
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).pipe(
      map((response: any) => {
        const contactsData = Array.isArray(response) ? response : (response.chats ? response.chats : []);
        return contactsData.map((contact: any) => {
          console.log('Mapped chat');
          if (contact.is_group) {
            return new Group(
              contact.is_group,
              contact.group_id,
              contact.group_name,
              contact.url,
              new Date(contact.created_at),
              contact.admin_user_id
            );
          } else {
            return new Contact(
              contact.is_group,
              contact.contact_id,
              contact.name,
              contact.url,
              contact.status,
              contact.streak
            );
          }
        });
      }),
      finalize(() => this.isLoading.set(false))
    );
  }
}
