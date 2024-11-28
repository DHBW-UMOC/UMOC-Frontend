import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFieldComponent } from './login-field.component';

describe('LoginFieldComponent', () => {
  let component: LoginFieldComponent;
  let fixture: ComponentFixture<LoginFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
