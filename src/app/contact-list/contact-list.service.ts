import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Contact} from "../model/contact.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContactListService {
  private contacts!: Array<Contact>

  private contactSource = new BehaviorSubject<Contact>(new Contact("",""));
  currentContact$ = this.contactSource.asObservable();

  selectContact(contact: Contact) {
    this.contactSource.next(contact);
  }

  constructor(private http: HttpClient) {
  }

  public fetchContacts(sessionID: string): Array<Contact> {
    this.http.get<any[]>(
        "http://localhost:5000/getContacts",
        { params: new HttpParams().append('sessionID', sessionID)}
    ).subscribe(contacts => {
      this.contacts = contacts.map(contact =>
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
