import {Component, Input} from '@angular/core';
import {Contact} from "../model/contact.model";

@Component({
  selector: 'contact-container',
  standalone: true,
  imports: [],
  templateUrl: './contact-container.component.html',
  styleUrl: './contact-container.component.scss'
})
export class ContactContainerComponent {
  @Input() contact!: Contact;
}
