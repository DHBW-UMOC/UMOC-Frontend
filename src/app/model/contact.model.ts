export class Contact {
  is_group: boolean;
  contact_id: string;
  name: string;
  picture_url: string;
  last_message_timestamp: Date;
  status: string;
  streak: number;

  constructor(is_group: boolean, contact_id: string, name: string, picture_url: string, last_message_timestamp: Date, status: string, streak: number) {
    this.is_group = is_group;
    this.contact_id = contact_id;
    this.name = name;
    this.picture_url = picture_url;
    this.last_message_timestamp = last_message_timestamp;
    this.status = status;
    this.streak = streak;
  }
}
