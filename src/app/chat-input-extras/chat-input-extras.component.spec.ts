import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInputExtrasComponent } from './chat-input-extras.component';

describe('ChatInputExtrasComponent', () => {
  let component: ChatInputExtrasComponent;
  let fixture: ComponentFixture<ChatInputExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatInputExtrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatInputExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
