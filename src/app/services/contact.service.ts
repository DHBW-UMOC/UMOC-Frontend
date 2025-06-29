import { effect, Injectable, linkedSignal, signal } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Contact } from '../model/contact.model';
import { Group } from '../model/group.model';
import { map, Observable } from 'rxjs';
import { LoginService } from './login.service';
import { EnvironmentService } from './environment.service';
import { Member } from '../model/member.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  isLoading = signal(false);
  self = signal<Contact | null>(null);
  contacts = signal<(Contact | Group)[]>([]);
  selectedContact = linkedSignal<(Contact | Group)[], (Contact | Group | null)>({
    source: this.contacts,
    computation: (source, previous) => {
      if (previous?.value) {
        return (source.find((opt) => opt.contact_id === previous.value!.contact_id) ?? null);
      }
      return null;
    }
  });
  showInfoOf = linkedSignal<(Contact | Group)[], (Contact | Group | null)>({
    source: this.contacts,
    computation: (source, previous) => {
      if (previous?.value) {
        const self = this.self();
        if (self && self.contact_id == previous.value!.contact_id) {
          return self!;
        }
        return (source.find((opt) => opt.contact_id === previous.value!.contact_id) ?? null);
      }
      return null;
    }
  });

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private environmentService: EnvironmentService
  ) {
    this.isLoading.set(true);
    effect(() => {
      if (this.loginService.userLoggedIn()) {
        this.fetchOwnUserInfo().subscribe(userData => {
          this.self.set(userData);
        });
        this.fetchContacts();
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

  hideInfo(): void {
    this.showInfoOf.set(null);
  }

  public fetchContacts() {
    this.http.get<any>(
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
              new Date(contact.last_message_timestamp),
              new Date(contact.created_at),
              members,
              contact.am_admin
            );
          } else {
            return new Contact(
              contact.is_group,
              contact.contact_id,
              contact.name,
              contact.picture_url,
              new Date(contact.last_message_timestamp),
              contact.status,
              contact.streak
            );
          }
        });
      })
    ).subscribe((contactsData: (Contact | Group)[]) => {
      const sortedContacts = [...contactsData].sort((a, b) =>
        b.last_message_timestamp.getTime() - a.last_message_timestamp.getTime()
      );
      this.contacts.set(sortedContacts);
      this.isLoading.set(false);
    });
  }

  fetchOwnUserInfo() {
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
          new Date(response.last_message_timestamp),
          'Friend',
          response.points
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
    ).subscribe(() => this.fetchContacts());
  }

  leaveGroup(group_id: string) {
    this.http.post(
      this.environmentService.getLeaveGroupUrl(),
      {
        'group_id': `${group_id}`
      },
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).subscribe(() => this.fetchContacts());
  }

  deleteGroup(group_id: string) {
    this.http.post(
      this.environmentService.getDeleteGroupUrl(),
      {
        'group_id': `${group_id}`
      },
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).subscribe();
    this.showInfoOf.set(null);
    this.selectedContact.set(null);
  }

  changeGroup(action: string, group_id: string, new_value: string) {
    this.http.post(
      this.environmentService.getChangeGroupUrl(),
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
        'member_id': `${new_member_id}`
      },
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).subscribe();
  }

  fetchNewContacts(newContactName: string): Observable<Contact[]> {
    return this.http.get<any>(
      this.environmentService.getGetAllUsersUrl(),
      {
        headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`}),
        params: new HttpParams().append('searchBy', newContactName)
      }
    ).pipe(
      map((response: any) => {
        const contactsData = Array.isArray(response) ? response : (response.users ? response.users : []);
        return contactsData.map((contact: any) => {
          return new Contact(
            false,
            contact.user_id,
            contact.username,
            contact.profile_picture,
            new Date(contact.last_message_timestamp),
            '',
            0
          );
        });
      })
    );
  }

  createGroup() {
    this.http.post<string>(
      this.environmentService.getCreateGroupUrl(),
      {},
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).subscribe(
      (groupData: any) => {
        const group = groupData.group;
        const members = group.members.map((member: any) => {
          return new Member(
            member.contact_id,
            member.name,
            member.picture_url,
            member.role
          );
        });
        const newGroup = new Group(
          group.is_group,
          group.contact_id,
          group.name,
          group.picture_url,
          new Date(group.last_message_timestamp),
          new Date(group.created_at),
          members,
          group.am_admin
        );
        this.selectedContact.set(newGroup);
        this.showInfoOf.set(newGroup);
      }
    );
  }

  changeProfile(action: string, new_value: string, old_password?: string) {
    if (this.self() && action == 'name') {
      const new_self = {...this.self()!, name: new_value};
      this.self.set(new_self);
      this.showInfoOf.set(new_self);
    } else if (this.self() && action == 'picture') {
      const new_self = {...this.self()!, picture_url: new_value};
      this.self.set(new_self);
      this.showInfoOf.set(new_self);
    }
    this.http.post(
      this.environmentService.getChangeProfileUrl(),
      {
        action: action,
        new_value: new_value,
        old_password: old_password
      },
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).subscribe();
  }
}
