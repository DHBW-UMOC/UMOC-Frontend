import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Contact } from "../model/contact.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactListService {
  private contacts: Array<Contact> = [];

  private contactSource = new BehaviorSubject<Contact | null>(null);
  currentContact$ = this.contactSource.asObservable();

  constructor(private http: HttpClient) {}

  selectContact(contact: Contact): void {
    this.contactSource.next(contact);
  }

  public fetchContacts(sessionID: string): Array<Contact> {
    this.http.get<any>(
      "http://localhost:5000/getContacts",
      { params: new HttpParams().append('sessionID', sessionID) }
    ).subscribe(response => {
      // API returns either array directly or inside 'contacts' property
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
