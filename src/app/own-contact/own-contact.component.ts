import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-own-contact',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './own-contact.component.html',
  styleUrl: './own-contact.component.scss'
})
export class OwnContactComponent {

  constructor(protected contactservice: ContactService) {
  }

  selectSelf() {
    this.contactservice.selectContactToEdit(this.contactservice.self()!)
  }
}
