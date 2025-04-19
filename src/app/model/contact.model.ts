export class Contact {
    contactID: string;
    userName: string;
    profilePicture: string;

    constructor(contact_id: string, name: string, url: string) {
        this.contactID = contact_id;
        this.userName = name;
        this.profilePicture = url;
    }
}
