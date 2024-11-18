import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactContainerComponent } from './contact-container.component';

describe('ContactContainerComponent', () => {
  let component: ContactContainerComponent;
  let fixture: ComponentFixture<ContactContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
