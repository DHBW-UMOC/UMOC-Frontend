export class Message {
  message_id: string;
  message: string;
  timeStamp: Date;
  sender_user_id: string;

  constructor(message_id:string, message: string, timeStamp: Date, sender_user_id: string) {
    this.message_id = message_id;
    this.message = message;
    this.timeStamp = timeStamp;
    this.sender_user_id = sender_user_id;
  }
}
