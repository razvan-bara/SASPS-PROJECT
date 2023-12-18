import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditOrderComponent } from './admin-edit-order.component';

describe('AdminEditOrderComponent', () => {
  let component: AdminEditOrderComponent;
  let fixture: ComponentFixture<AdminEditOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
