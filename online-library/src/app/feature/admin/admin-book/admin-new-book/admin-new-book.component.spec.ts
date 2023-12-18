import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewBookComponent } from './admin-new-book.component';

describe('AdminNewBookComponent', () => {
  let component: AdminNewBookComponent;
  let fixture: ComponentFixture<AdminNewBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
