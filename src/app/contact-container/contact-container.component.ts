import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Contact} from "../model/contact.model";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'contact-container',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './contact-container.component.html',
  styleUrl: './contact-container.component.scss'
})
export class ContactContainerComponent {
  @Input() contact!: Contact;
  @Output() contactClick = new EventEmitter<Contact>();

  onContactClick() {
    this.contactClick.emit(this.contact);
  }
}
