import { Component, Input } from '@angular/core';
import { Member } from '../model/member.model';
import { NgOptimizedImage } from '@angular/common';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-member-container',
  imports: [
    NgOptimizedImage,
    MatButtonToggle,
    MatFabButton,
    MatIcon, 
    MatCardModule
  ],
  templateUrl: './member-container.component.html',
  styleUrl: './member-container.component.scss'
})
export class MemberContainerComponent {
  @Input() member: Member | null = null;
}
