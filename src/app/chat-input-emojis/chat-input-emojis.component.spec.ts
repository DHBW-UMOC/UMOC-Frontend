import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatInputEmojisComponent } from './chat-input-emojis.component';

describe('ChatInputEmojisComponent', () => {
  let component: ChatInputEmojisComponent;
  let fixture: ComponentFixture<ChatInputEmojisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatInputEmojisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatInputEmojisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
