import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListSearchBarComponent } from './contact-list-search-bar.component';

describe('ContactListSearchBarComponent', () => {
  let component: ContactListSearchBarComponent;
  let fixture: ComponentFixture<ContactListSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListSearchBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactListSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
