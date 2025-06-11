import { effect, Injectable, signal } from '@angular/core';
import { LoginService } from './login.service';
import { ContactService } from './contact.service';
import { ChatService } from './chat.service';
import { UmocService } from './umoc.service';
import { EnvironmentService } from './environment.service';
import { io, Socket } from 'socket.io-client';
import { EarlyMessage } from '../model/early-message.model';
import { ActiveItem } from '../model/active-item.model';

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
    effect(() => {
        this.contactService.selectedContact();
        this.earlyMessages.set([]);
      }
    );
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
      this.contactService.fetchContacts();
    });

    this.socket.on('new_message', (message) => {
      const currentContact = this.contactService.selectedContact();
      if (currentContact && currentContact!.contact_id == (message.is_group ? message.recipient_id : message.sender_id)) {
        this.chatService.fetchChatHistory(message.is_group ? message.recipient_id : message.sender_id);
      }
    });

    this.socket.on('receive_char', (earlyMessageData) => {
      const currentContact = this.contactService.selectedContact();
      if (currentContact && currentContact!.contact_id == (earlyMessageData.is_group ? earlyMessageData.recipient_id : earlyMessageData.sender_id)) {
        const earlyMessage = new EarlyMessage(earlyMessageData.char, earlyMessageData.sender_id, earlyMessageData.sender_username);
        const existingIndex = this.earlyMessages().findIndex(msg => msg.sender_id === earlyMessageData.sender_id);
        if (existingIndex !== -1) {
          const oldMessages = [...this.earlyMessages()];
          if (earlyMessage.content == '') {
            oldMessages.splice(existingIndex, 1);
            this.earlyMessages.set(oldMessages);
          } else {
            oldMessages[existingIndex] = earlyMessage;
            this.earlyMessages.set(oldMessages);
          }
        } else {
          const oldMessages = [...this.earlyMessages(), earlyMessage];
          this.earlyMessages.set(oldMessages);
        }
      }
    });

    this.socket.on('item_used', (itemData: any) => {
      this.umocService.activateItem(new ActiveItem(itemData.name, new Date(itemData.active_until)));
    })
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