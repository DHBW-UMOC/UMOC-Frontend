import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnContactComponent } from './own-contact.component';

describe('OwnContactComponent', () => {
  let component: OwnContactComponent;
  let fixture: ComponentFixture<OwnContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
