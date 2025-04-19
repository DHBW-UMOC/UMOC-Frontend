export class Message {
  message: string;
  timeStamp: Date;
  sender_user_id: string;

  constructor(message: string, timeStamp: Date, sender_user_id: string) {
    this.message = message;
    this.timeStamp = timeStamp;
    this.sender_user_id = sender_user_id;
  }
}
