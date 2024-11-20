export class Contact {
  userName: string;
  profilePicture?: string; //URL muss abgefragt werden

  constructor(userName: string, profilePicture?: string) {
    this.userName = userName;
    this.profilePicture = profilePicture;
  }
}
