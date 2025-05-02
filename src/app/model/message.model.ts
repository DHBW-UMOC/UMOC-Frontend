export class Message {
  content: string;
  message_id: string;
  recipient_id: string;
  sender_user_id: string;
  sender_username: string;
  timestamp: Date;
  type: string;

  constructor(content: string , message_id:string, recipient_id: string, sender_user_id: string, sender_username: string, timeStamp: Date, type: string) {
    this.content = content;
    this.message_id = message_id;
    this.recipient_id = recipient_id;
    this.sender_user_id = sender_user_id;
    this.sender_username = sender_username;
    this.timestamp = timeStamp;
    this.type = type;
  }
}
