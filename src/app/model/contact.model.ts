import { Chat } from './chat.model';

export class Contact implements Chat{
  is_group: boolean;
  contact_id: string;
  name: string;
  picture_url: string;
  status: string;
  streak: number;

  constructor(is_group: boolean, contact_id: string, name: string, picture_url: string, status: string, streak: number) {
    this.is_group = is_group;
    this.contact_id = contact_id;
    this.name = name;
    this.picture_url = picture_url;
    this.status = status;
    this.streak = streak;
  }
}
