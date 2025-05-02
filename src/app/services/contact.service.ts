import { Injectable, linkedSignal, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../model/contact.model';
import { finalize, map, Observable } from 'rxjs';
import { LoginService } from './login.service';
import { EnvironmentService } from './environment.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
  contacts = toSignal(this.fetchContacts(), {initialValue: []});
  selectedContact = linkedSignal<Contact[], Contact | null>({
    source: this.contacts,
    computation: (newContacts, previous) => {
      if (previous?.value) {
        const found = newContacts.find((contact) => contact.contact_id === previous.value!.contact_id);
        console.log('Found contact: ', found!.name);
        if (found) return found;
      }
      console.log('No contact selected');
      return null;
    }
  });

  updateContacts() {
    // Handle messages from new contacts received over websocket or add new contacts
  }

  selectContact(contact: Contact) {
    this.selectedContact.set(contact);
  }

  public fetchContacts(): Observable<Contact[]> {
    this.isLoading.set(true);
    return this.http.get<any>(
      this.environmentService.getContactsUrl(),
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).pipe(
      map((response: any) => {
        const contactsData = Array.isArray(response) ? response : (response.contacts ? response.contacts : []);
        return contactsData.map((contact: any) => {
          console.log('Mapped contact');
          return new Contact(
            contact.is_group,
            contact.contact_id,
            contact.name,
            contact.status,
            contact.streak,
            contact.url
          );
        });
      }),
      finalize(() => this.isLoading.set(false))
    );
  }
}
