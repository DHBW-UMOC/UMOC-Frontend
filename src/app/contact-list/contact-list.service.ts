import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../model/contact.model';
import { BehaviorSubject } from 'rxjs';
import { PRODUCTION } from '../../environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class ContactListService {
  private contacts: Array<Contact> = [];
  private contactSource = new BehaviorSubject<Contact | null>(null);
  currentContact$ = this.contactSource.asObservable();

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) {
  }

  selectContact(contact: Contact): void {
    this.contactSource.next(contact);
  }

  public fetchContacts(): Array<Contact> {
    this.http.get<any>(
      `${PRODUCTION}/getContacts`,
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).subscribe(response => {
      const contactsData = Array.isArray(response) ? response : response.contacts || [];
      this.contacts = contactsData.map((contact: any) =>
        new Contact(
          contact.contact_id,
          contact.name,
          contact.url
        )
      );
    });
    return this.contacts;
  }
}
