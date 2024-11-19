import { Component } from '@angular/core';
import { ContactContainerComponent } from "../contact-container/contact-container.component";
import { ContactListSearchBarComponent } from "../contact-list-search-bar/contact-list-search-bar.component";
import { ContactListHeaderComponent } from "../contact-list-header/contact-list-header.component";

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [ContactContainerComponent, ContactListSearchBarComponent, ContactListHeaderComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent {

}
