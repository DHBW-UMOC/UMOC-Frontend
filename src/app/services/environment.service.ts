import { Injectable } from '@angular/core';
import { CURRENT_ENVIRONMENT } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  private apiUrl = CURRENT_ENVIRONMENT; // Choose an environment from enum values

  // Authentication Endpoints
  getLoginUrl(): string {
    return `${this.apiUrl}/login`;
  }

  getRegisterUrl(): string {
    return `${this.apiUrl}/register`;
  }

  // Contact Management Endpoints
  getContactsUrl(): string {
    return `${this.apiUrl}/getChats`;
  }

  getChangeContactUrl(): string {
    return `${this.apiUrl}/changeContact`;
  }

  getGetOwnProfileUrl() {
    return `${this.apiUrl}/getOwnProfile`;
  }

  getGetAllUsersUrl() {
    return `${this.apiUrl}/getAllUsers`;
  }

  getChangeProfileUrl() {
    return `${this.apiUrl}/changeProfile`;
  }

  // Messaging Endpoints
  getContactMessagesUrl(): string {
    return `${this.apiUrl}/getChatMessages`;
  }

  getSaveMessageUrl(): string {
    return `${this.apiUrl}/saveMessage`;
  }

  // Group Management Endpoints
  getCreateGroupUrl(): string {
    return `${this.apiUrl}/createGroup`;
  }

  getDeleteGroupUrl(): string {
    return `${this.apiUrl}/deleteGroup`;
  }

  getChangeGroupUrl(): string {
    return `${this.apiUrl}/changeGroup`;
  }

  getAddMemberUrl(): string {
    return `${this.apiUrl}/addMember`;
  }

  getRemoveMemberUrl(): string {
    return `${this.apiUrl}/removeMember`;
  }

  getLeaveGroupUrl() {
    return `${this.apiUrl}/leaveGroup`;
  }

  // Websocket Endpoint
  getWSUrl() {
    return `${this.apiUrl}`;
  }

  // Umoc Endpoints
  getGetItemListUrl() {
    return `${this.apiUrl}/getItemList`;
  }

  getGetInventoryUrl() {
    return `${this.apiUrl}/getInventory`;
  }

  getGetActiveItemsUrl() {
    return `${this.apiUrl}/getActiveItems`;
  }

  getBuyItemUrl() {
    return `${this.apiUrl}/buyItem`;
  }

  getUseItemUrl() {
    return `${this.apiUrl}/useItem`;
  }
}