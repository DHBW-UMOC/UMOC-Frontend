import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-ad-banner',
  imports: [NgIf],
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.scss']
})
export class AdBannerComponent {
  @Input() hidden: boolean = false;
  @Input() imageSrc?: string;
  @Input() videoSrc?: string;
  @Input() altText: string = 'Ad Banner';
}
