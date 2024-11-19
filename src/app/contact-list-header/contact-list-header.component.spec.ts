import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListHeaderComponent } from './contact-list-header.component';

describe('ContactListHeaderComponent', () => {
  let component: ContactListHeaderComponent;
  let fixture: ComponentFixture<ContactListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
