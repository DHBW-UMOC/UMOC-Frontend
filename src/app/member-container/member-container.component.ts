import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() editable!: boolean;
  @Output() adminChange = new EventEmitter<string>();
  @Output() removeMember = new EventEmitter();

  protected flipped: boolean = false;
  protected pressed: boolean = false;

  isAdmin(): boolean {
    return this.member?.role === 'admin';
  }

  onToggleAdmin(): void {
    this.adminChange.emit(this.isAdmin() ? 'de_admin' : 'admin');
    this.flipped = true;
  }

  onRemoveMember(): void {
    this.removeMember.emit();
    this.pressed = true;
  }
}
