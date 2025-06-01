import { effect, Injectable, signal } from '@angular/core';
import { LoginService } from './login.service';
import { ContactService } from './contact.service';
import { ChatService } from './chat.service';
import { UmocService } from './umoc.service';
import { EnvironmentService } from './environment.service';
import { io, Socket } from 'socket.io-client';
import { EarlyMessage } from '../model/early-message.model';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  private socket: Socket | null = null;
  isConnected = signal(false);
  earlyMessages = signal<EarlyMessage[]>([]);

  constructor(
    private loginService: LoginService,
    private contactService: ContactService,
    private chatService: ChatService,
    private umocService: UmocService,
    private environmentService: EnvironmentService
  ) {
    effect(() => {
      if (this.loginService.userLoggedIn()) {
        this.connect();
      } else if (this.socket) {
        this.disconnect();
      }
    });
  }

  private connect(): void {
    if (this.socket) return;
    this.socket = io(this.environmentService.getWSUrl(), {
      query: {token: this.loginService.getAuthToken()},
      reconnectionAttempts: 5,
      timeout: 10000
    });

    this.socket.on('connect', () => {
      this.isConnected.set(true);
    });

    this.socket.on('disconnect', () => {
      this.isConnected.set(false);
    });

    this.socket.on('chat_change', () => {
      this.contactService.fetchContacts().subscribe(contactsData => {
        this.contactService.contacts.set(contactsData);
      });
    });

    this.socket.on('new_message', (message) => {
      if (this.contactService.selectedContact()) {
        if (message.is_group) {
          if (this.contactService.selectedContact()!.contact_id == message.recipient_id) {
            this.chatService.updateChatHistory(message.recipient_id);
          }
        } else {
          if (this.contactService.selectedContact()!.contact_id == message.sender_id) {
            this.chatService.updateChatHistory(message.sender_id);
          }
        }
      }
    });

    this.socket.on('receive_char', (earlyMessage) => {
      if (this.contactService.selectedContact()) {
        if (earlyMessage.is_group) {
          if (this.contactService.selectedContact()!.contact_id == earlyMessage.recipient_id) {
            this.indentPrevent(earlyMessage);
          }
        } else {
          if (this.contactService.selectedContact()!.contact_id == earlyMessage.sender_id) {
            this.indentPrevent(earlyMessage);
          }
        }
      }
    });
  }

  private indentPrevent(earlyMessage: any){
    const existingIndex = this.earlyMessages().findIndex(msg => msg.sender_id === earlyMessage.sender_id);
    if (existingIndex !== -1) {
      const oldMessages = [...this.earlyMessages()];
      oldMessages[existingIndex] = new EarlyMessage(
        earlyMessage.char,
        earlyMessage.sender_id,
        'Username gebraucht'
      );
      this.earlyMessages.set(oldMessages);
    } else {
      const oldMessages = [...this.earlyMessages(), new EarlyMessage(
        earlyMessage.char,
        earlyMessage.sender_id,
        'Username gebraucht'
      )];
      this.earlyMessages.set(oldMessages);
    }
  }

  private disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected.set(false);
    }
  }

  sendMessageTooEarly(message: string) {
    if (this.socket && this.isConnected()) {
      this.socket.emit('send_char', {
        recipient_id: this.contactService.selectedContact()?.contact_id,
        char: message
      });
    }
  }
}