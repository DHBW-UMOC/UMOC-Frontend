import {Contact} from "./contact.model";

export class Message {
  message: string;
  timeStamp?: Date;
  owner?: string;

  constructor(message: string, timeStamp?: Date, owner?: string) {
    this.message = message;
    this.timeStamp = timeStamp;
    this.owner = owner;
  }
}
