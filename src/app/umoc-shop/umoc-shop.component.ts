import { Component } from '@angular/core';
import { UmocService } from '../services/umoc.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-umoc-shop',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './umoc-shop.component.html',
  styleUrl: './umoc-shop.component.scss'
})
export class UmocShopComponent {
  constructor(protected umocService: UmocService) {
  }
}