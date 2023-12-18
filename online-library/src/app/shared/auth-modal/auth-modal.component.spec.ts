import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthModal } from './auth-modal.component';

describe('AuthModal', () => {
  let component: AuthModal;
  let fixture: ComponentFixture<AuthModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthModal ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
