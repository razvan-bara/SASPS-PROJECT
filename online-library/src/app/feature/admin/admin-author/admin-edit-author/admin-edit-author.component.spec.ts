import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditAuthorComponent } from './admin-edit-author.component';

describe('AdminEditAuthorComponent', () => {
  let component: AdminEditAuthorComponent;
  let fixture: ComponentFixture<AdminEditAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditAuthorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
