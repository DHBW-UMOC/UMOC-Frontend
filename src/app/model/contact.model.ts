export class Contact {
  is_group: boolean;
  contact_id: string;
  name: string;
  status: string;
  streak: number;
  picture_url: string;

  constructor(is_group: boolean, contact_id: string, name: string, status: string, streak: number, picture_url: string) {
    this.is_group = is_group;
    this.contact_id = contact_id;
    this.name = name;
    this.status = status;
    this.streak = streak;
    this.picture_url = picture_url;
  }
}
