import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLoginGreetingComponent } from './register-login-greeting.component';

describe('RegisterLoginGreetingComponent', () => {
  let component: RegisterLoginGreetingComponent;
  let fixture: ComponentFixture<RegisterLoginGreetingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterLoginGreetingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterLoginGreetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
