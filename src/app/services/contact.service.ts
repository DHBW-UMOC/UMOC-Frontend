import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../model/contact.model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { LoginService } from './login.service';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Array<Contact> = [];
  private contactSource = new BehaviorSubject<Contact | null>(null);
  currentContact$ = this.contactSource.asObservable();

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private environmentService: EnvironmentService
  ) {
  }

  selectContact(contact: Contact): void {
    this.contactSource.next(contact);
  }

  public fetchContacts(): Observable<Contact[]> {
    return this.http.get<any>(
      this.environmentService.getContactsUrl(),
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).pipe(
      map((response: any) => {
        const contactsData = Array.isArray(response) ? response : (response.contacts ? response.contacts : []);
        return  contactsData.map((contact: any) => {
          return new Contact(
            contact.contact_id,
            contact.name,
            contact.url
          )
        });
      })
    );
  }
}
