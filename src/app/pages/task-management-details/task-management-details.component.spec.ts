import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskManagementDetailsComponent } from './task-management-details.component';

describe('TaskManagementDetailsComponent', () => {
  let component: TaskManagementDetailsComponent;
  let fixture: ComponentFixture<TaskManagementDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskManagementDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskManagementDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
