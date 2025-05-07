export class Member {
  user_id: string;
  name: string;
  picture_url: string;
  role: 'admin' | 'member';

  constructor(user_id: string, name: string, profile_picture: string, role: string) {
    this.user_id = user_id;
    this.name = name;
    this.picture_url = profile_picture;
    this.role = role as 'admin' | 'member';
  }
}