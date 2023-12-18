import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMailComponent } from './register-mail.component';

describe('RegisterMailComponent', () => {
  let component: RegisterMailComponent;
  let fixture: ComponentFixture<RegisterMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterMailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
