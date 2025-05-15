import { Chat } from './chat.model';
import { Member } from './member.model';

export class Group implements Chat{
  is_group: boolean;
  contact_id: string;
  name: string;
  picture_url: string;
  created_at: Date;
  members: Member[];
  am_admin: boolean;

  constructor(is_group: boolean, contact_id: string, name: string, picture_url: string, created_at: Date, members: Member[], am_admin:boolean) {
    this.is_group = is_group;
    this.contact_id = contact_id;
    this.name = name;
    this.picture_url = picture_url;
    this.created_at = created_at;
    this.members = members;
    this.am_admin = am_admin;
  }
}