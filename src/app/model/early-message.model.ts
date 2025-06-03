import { Message } from './message.model';

export class EarlyMessage {
  content: string;
  sender_id: string;
  sender_username: string;

  constructor(content: string, sender_id: string, sender_username: string) {
    this.content = content;
    this.sender_id = sender_id;
    this.sender_username = sender_username;
  }

  toMessage(): Message {
    return {
      message_id: 'temp_' + Date.now(),
      content: this.content,
      sender_user_id: this.sender_id,
      sender_username: this.sender_username,
      timestamp: new Date(),
      recipient_id: '',
      type: 'text'
    };
  }
}