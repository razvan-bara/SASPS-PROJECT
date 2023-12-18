import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewAuthorComponent } from './admin-new-author.component';

describe('AdminNewAuthorComponent', () => {
  let component: AdminNewAuthorComponent;
  let fixture: ComponentFixture<AdminNewAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNewAuthorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNewAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
