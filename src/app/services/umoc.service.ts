import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UmocService {
  showShop = signal<boolean>(false);
  showAdBanners = signal<boolean>(true);
  showDuckBackground = signal<boolean>(false);

  constructor(
  ) {
  }

  toggleShop() {
    this.showShop.set(!this.showShop());
  }

  toggleAdBanner() {
    this.showAdBanners.set(!this.showAdBanners());
  }

  toggleDuckBackground() {
    this.showDuckBackground.set(!this.showDuckBackground());
  }
}