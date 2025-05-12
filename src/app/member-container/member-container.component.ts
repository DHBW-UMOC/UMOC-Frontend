import { Component, Input } from '@angular/core';
import { Member } from '../model/member.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-member-container',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './member-container.component.html',
  styleUrl: './member-container.component.scss'
})
export class MemberContainerComponent {
  @Input() member: Member | null = null;
}
