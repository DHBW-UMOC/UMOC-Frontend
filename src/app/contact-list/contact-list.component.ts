import { Component } from '@angular/core';
import { ContactContainerComponent } from "../contact-container/contact-container.component";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [ContactContainerComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {

}
