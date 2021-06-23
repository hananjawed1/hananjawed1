import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftMembershipManagementComponent } from './draft-membership-management.component';

describe('DraftMembershipManagementComponent', () => {
  let component: DraftMembershipManagementComponent;
  let fixture: ComponentFixture<DraftMembershipManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftMembershipManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftMembershipManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
