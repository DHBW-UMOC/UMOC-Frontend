export class EarlyMessage {
  content: string;
  sender_id: string;
  sender_username: string;

  constructor(content: string, sender_id: string, sender_username: string) {
    this.content = content;
    this.sender_id = sender_id;
    this.sender_username = sender_username;
  }
}