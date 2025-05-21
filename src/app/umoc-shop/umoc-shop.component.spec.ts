import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmocShopComponent } from './umoc-shop.component';

describe('UmocShopComponent', () => {
  let component: UmocShopComponent;
  let fixture: ComponentFixture<UmocShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UmocShopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UmocShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
