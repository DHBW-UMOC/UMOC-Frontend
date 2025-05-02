import { Chat } from './chat.model';

export class Group implements Chat{
  is_group: boolean;
  contact_id: string;
  name: string;
  picture_url: string;
  created_at: Date;
  admin_user_id: string;

  constructor(is_group: boolean, contact_id: string, name: string, picture_url: string, created_at: Date, admin_user_id: string) {
    this.is_group = is_group;
    this.contact_id = contact_id;
    this.name = name;
    this.picture_url = picture_url;
    this.created_at = created_at;
    this.admin_user_id = admin_user_id;
  }
}