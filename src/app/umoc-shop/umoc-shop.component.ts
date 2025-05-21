import { Component } from '@angular/core';
import { UmocService } from '../services/umoc.service';
import { MatFabButton } from '@angular/material/button';

@Component({
  selector: 'app-umoc-shop',
  imports: [
    MatFabButton
  ],
  templateUrl: './umoc-shop.component.html',
  styleUrl: './umoc-shop.component.scss'
})
export class UmocShopComponent {
  constructor(protected umocService: UmocService) {
  }
}
