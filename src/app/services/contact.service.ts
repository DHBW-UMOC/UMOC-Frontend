import { effect, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../model/contact.model';
import { Group } from '../model/group.model';
import { finalize, map, Observable } from 'rxjs';
import { LoginService } from './login.service';
import { EnvironmentService } from './environment.service';
import { Member } from '../model/member.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  isLoading = signal(false);
  selectedContact = signal<Contact | Group | null>(null);
  self = signal<Contact | null>(null);
  contacts = signal<(Contact | Group)[]>([]);
  showInfoOf = signal<Contact | Group | null>(null);

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private environmentService: EnvironmentService
  ) {
    effect(() => {
      if (this.loginService.userLoggedIn()) {
        this.fetchOwnUserInfo().subscribe(userData => {
          this.self.set(userData);
        });
        this.fetchContacts().subscribe(contactsData => {
          this.contacts.set(contactsData);
        });
      } else {
        this.contacts.set([]);
        this.self.set(null);
      }
    });
  }

  selectContact(chat: Contact | Group) {
    this.showInfoOf.set(null);
    this.selectedContact.set(chat);
  }

  selectContactToEdit(chat: Contact | Group) {
    this.showInfoOf.set(chat);
  }

  public fetchContacts(): Observable<Contact[]> {
    this.isLoading.set(true);
    return this.http.get<any>(
      this.environmentService.getContactsUrl(),
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).pipe(
      map((response: any) => {
        const contactsData = Array.isArray(response) ? response : (response.chats ? response.chats : []);
        return contactsData.map((contact: any) => {
          if (contact.is_group) {
            const members = contact.members.map((member: any) => {
              return new Member(
                member.contact_id,
                member.name,
                member.picture_url,
                member.role
              );
            });
            return new Group(
              contact.is_group,
              contact.contact_id,
              contact.name,
              contact.picture_url,
              new Date(contact.created_at),
              members
            );
          } else {
            return new Contact(
              contact.is_group,
              contact.contact_id,
              contact.name,
              contact.picture_url,
              contact.status,
              contact.streak
            );
          }
        });
      }),
      finalize(() => this.isLoading.set(false))
    );
  }

  private fetchOwnUserInfo() {
    return this.http.get<any>(
      this.environmentService.getGetOwnProfileUrl(),
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).pipe(
      map((response: any) => {
        return new Contact(
          false,
          response.user_id,
          response.username,
          response.profile_picture,
          'Friend',
          0
        );
      })
    );
  }

  getOwnUserID(): string {
    return this.loginService.getUserID();
  }

  changeContactStatus(contact_id: string, $option: string) {
    this.http.post(
      this.environmentService.getChangeContactUrl(),
      {
        'contact_id': `${contact_id}`,
        'status': `${$option}`
      },
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).subscribe();
  }

  leaveGroup(group_id: string) {
    this.http.post(
      this.environmentService.getLeaveGroupUrl(),
      {
        'group_id': `${group_id}`
      },
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).subscribe();
  }

  deleteGroup(group_id: string) {
    this.http.post(
      this.environmentService.getDeleteGroupUrl(),
      {
        'group_id': `${group_id}`
      },
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).subscribe();
  }

  changeGroup(action: string, group_id: string, new_value: string) {
    this.http.post(
      this.environmentService.getDeleteGroupUrl(),
      {
        'action': `${action}`,
        'group_id': `${group_id}`,
        'new_value': `${new_value}`
      },
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).subscribe();
  }

  addMember(group_id: string, new_member_id: string) {
    this.http.post(
      this.environmentService.getAddMemberUrl(),
      {
        'group_id': `${group_id}`,
        'new_member_id': `${new_member_id}`
      },
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).subscribe();
  }

  removeMember(group_id: string, new_member_id: string) {
    this.http.post(
      this.environmentService.getRemoveMemberUrl(),
      {
        'group_id': `${group_id}`,
        'new_member_id': `${new_member_id}`
      },
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).subscribe();
  }
}
