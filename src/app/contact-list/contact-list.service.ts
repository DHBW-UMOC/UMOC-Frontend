import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Contact} from "../model/contact.model";

@Injectable({
  providedIn: 'root'
})
export class ContactListService {
  constructor() {
  }

  public fetchContacts(sessionID: string):Array<Contact> {
    //TODO: Actually get some Data
    return [{userName:"DummyUser0"},{userName:"DummyUser1"},{userName:"DummyUser2"},{userName:"DummyUser3"},{userName:"DummyUser4"},{userName:"DummyUser5"}];
  }
}
