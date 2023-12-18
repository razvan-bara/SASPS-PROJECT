import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorFormComponent } from './admin-author-form.component';

describe('AdminAuthorFormComponent', () => {
  let component: AdminAuthorFormComponent;
  let fixture: ComponentFixture<AdminAuthorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAuthorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAuthorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
