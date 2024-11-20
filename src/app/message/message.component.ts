
import {Component, Input} from '@angular/core';
import {Message} from "../model/message.model";
import {CommonModule, NgClass} from '@angular/common';


@Component({
  selector: 'app-message',
  standalone: true,
  imports: [NgClass],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  @Input() message!: Message;
  @Input() isSent: string | undefined = "";
}
