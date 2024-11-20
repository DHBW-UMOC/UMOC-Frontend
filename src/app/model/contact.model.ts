export class Contact {
    userID: string;
    userName: string;
    profilePicture?: string;

    constructor(contact_id: string, name: string, url?: string) {
        this.userID = contact_id;
        this.userName = name;
        this.profilePicture = url;
    }
}
