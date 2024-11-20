import {Contact} from "./contact.model";

export class Message {
  message: string;
  timeStamp?: Date;
  owner?: Contact;

  constructor(message: string, timeStamp?: Date, owner?: Contact) {
    this.message = message;
    this.timeStamp = timeStamp;
    this.owner = owner;
  }
}
