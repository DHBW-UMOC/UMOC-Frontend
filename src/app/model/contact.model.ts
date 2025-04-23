export class Contact {
  contact_id: string;
  user_name: string;
  profile_picture: string;

  constructor(contact_id: string, name: string, url: string) {
    this.contact_id = contact_id;
    this.user_name = name;
    this.profile_picture = url;
  }
}
