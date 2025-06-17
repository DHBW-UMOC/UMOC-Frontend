import { effect, Injectable, OnDestroy, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { EnvironmentService } from './environment.service';
import { map } from 'rxjs';
import { Item } from '../model/item.model';
import { ActiveItem } from '../model/active-item.model';
import { ContactService } from './contact.service';

@Injectable({
  providedIn: 'root'
})
export class UmocService implements OnDestroy {
  showShop = signal<boolean>(false);
  showAdBanners = signal<boolean>(false);
  showDuckBackground = signal<boolean>(false);
  showTimeOutReminder = signal<boolean>(false);
  itemTypes = signal<Item[]>([]);
  inventory = signal<Item[]>([]);
  activeItems = signal<ActiveItem[]>([]);
  pointCount = signal<number>(10);
  private activeItemsCheckInterval: any;

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private contactService: ContactService,
    private environmentService: EnvironmentService
  ) {
    effect(() => {
      if (this.loginService.userLoggedIn()) {
        this.fetchItemTypes();
        this.fetchInventory();
        this.fetchActiveItems();
        this.startActiveItemsCheck();
      } else {
        this.stopActiveItemsCheck();
      }
    });
    effect(() => {
      const self = this.contactService.self();
      if (self) {
        this.pointCount.set(self.streak);
      }
    });
  }

  ngOnDestroy() {
    this.stopActiveItemsCheck();
  }

  toggleShop() {
    this.showShop.set(!this.showShop());
  }

  private toggleColorScheme(scheme: 'dark' | 'light') {
    document.documentElement.style.colorScheme = scheme;
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${scheme}-theme`);
  }

  private fetchItemTypes() {
    this.http.get(
      this.environmentService.getGetItemListUrl(),
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).pipe(
      map((responseData: any) => {
        const itemData = Array.isArray(responseData) ? responseData : (responseData.items ? responseData.items : []);
        return itemData.map((item: any) => {
          return new Item(item.item_name, item.price);
        });
      })
    ).subscribe((items) => this.itemTypes.set(items));
  }

  private fetchInventory() {
    this.http.get(
      this.environmentService.getGetInventoryUrl(),
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).pipe(
      map((responseData: any) => {
        const itemData = Array.isArray(responseData) ? responseData : (responseData.inventory ? responseData.inventory : []);
        return itemData.map((item: any) => {
          return new Item(item.item_name, 0, item.quantity);
        });
      })
    ).subscribe((items) => {
      this.inventory.set(items);
    });
  }

  private fetchActiveItems() {
    this.http.get(
      this.environmentService.getGetActiveItemsUrl(),
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).pipe(
      map((responseData: any) => {
        const activeItemData = Array.isArray(responseData) ? responseData : (responseData.active_items ? responseData.active_items : []);
        return activeItemData.map((activeItem: any) => {
          return new ActiveItem(activeItem.item_name, new Date(activeItem.active_until));
        });
      })
    ).subscribe((activeItemsFromServer: ActiveItem[]) => {
      this.activeItems.set(activeItemsFromServer);
      activeItemsFromServer.forEach(item => {
        const itemActionMap: Record<string, () => void> = {
          'alt_background': () => this.showDuckBackground.set(true),
          'show_ads': () => this.showAdBanners.set(true),
          'timeout': () => this.showTimeOutReminder.set(true),
          'flashbang': () => this.toggleColorScheme('light')
        };
        if (itemActionMap[item.item_name]) {
          itemActionMap[item.item_name]();
        }
      });
    });
  }

  buyItem(item_to_buy: Item) {
    if (this.pointCount() >= item_to_buy.price) {
      this.pointCount.set(this.pointCount() - item_to_buy.price);
      this.http.post(
        this.environmentService.getBuyItemUrl(),
        {
          'item_name': item_to_buy.item_name,
          'amount': 1
        },
        {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
      ).subscribe({
        next: () => {
          this.fetchInventory();
          this.contactService.fetchOwnUserInfo();
        },
        error: error => {
          if (error.error.error == "Not enough points to buy this item"){
            window.alert("Nein");
          }
        }
      });
    } else {
      window.alert('Punktestand ist nicht ausreichend');
      window.location.reload();
    }
  }

  useItem(item_name: string, to_user_id: string) {
    this.http.post(
      this.environmentService.getUseItemUrl(),
      {
        'item_name': item_name,
        'to_user_id': to_user_id
      },
      {headers: new HttpHeaders({'Authorization': `Bearer ${this.loginService.getAuthToken()}`})}
    ).subscribe({
      next: () => {
        this.fetchInventory();
        this.fetchActiveItems();
      },
      error: (error: HttpErrorResponse) => {
        if (error.error.error == 'Item already active for this user') {
          window.alert('Das Item ist bei diesem Nutzer bereits aktiv');
          return;
        }
        window.alert('Unbekannter Fehler');
      }
    });
  }

  activateItem(activatedItem: ActiveItem) {
    const itemActionMap: Record<string, () => void> = {
      'alt_background': () => this.showDuckBackground.set(true),
      'show_ads': () => this.showAdBanners.set(true),
      'timeout': () => this.showTimeOutReminder.set(true),
      'flashbang': () => this.toggleColorScheme('light')
    };
    if (itemActionMap[activatedItem.item_name]) {
      itemActionMap[activatedItem.item_name]();
      const currentActiveItems = this.activeItems();
      this.activeItems.set([...currentActiveItems, activatedItem]);
    }
  }

  private deactivateItem(item_name: string) {
    const itemActionMap: Record<string, () => void> = {
      'alt_background': () => this.showDuckBackground.set(false),
      'show_ads': () => this.showAdBanners.set(false),
      'timeout': () => this.showTimeOutReminder.set(false),
      'flashbang': () => this.toggleColorScheme('dark')
    };
    if (itemActionMap[item_name]) {
      itemActionMap[item_name]();
    }
  }

  private startActiveItemsCheck() {
    if (!this.activeItemsCheckInterval) {
      this.activeItemsCheckInterval = setInterval(() => this.checkActiveItems(), 3000);
    }
  }

  private stopActiveItemsCheck() {
    if (this.activeItemsCheckInterval) {
      clearInterval(this.activeItemsCheckInterval);
      this.activeItemsCheckInterval = null;
    }
  }

  private checkActiveItems() {
    const now = new Date();
    const activeItemsCopy = [...this.activeItems()];
    let hasChanges = false;
    for (let i = activeItemsCopy.length - 1; i >= 0; i--) {
      const item = activeItemsCopy[i];
      if (item.active_until < now) {
        activeItemsCopy.splice(i, 1);
        this.deactivateItem(item.item_name);
        hasChanges = true;
      }
    }
    if (hasChanges) {
      this.activeItems.set(activeItemsCopy);
    }
  }
}