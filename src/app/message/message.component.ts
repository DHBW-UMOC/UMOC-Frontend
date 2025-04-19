import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../model/message.model';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-message',
  imports: [CommonModule, NgClass, NgIf],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit {
  currentUser: string | undefined = '';
  @Input() message!: Message;
  @Input() sender: string | undefined = '';

  constructor(
    private loginService: LoginService
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.loginService.getUserID();
  }

  isValidMessage(): boolean {
    return !!this.message && !!this.message.message;
  }
}