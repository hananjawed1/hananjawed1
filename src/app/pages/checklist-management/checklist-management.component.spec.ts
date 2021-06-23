import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistManagementComponent } from './checklist-management.component';

describe('ChecklistManagementComponent', () => {
  let component: ChecklistManagementComponent;
  let fixture: ComponentFixture<ChecklistManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
