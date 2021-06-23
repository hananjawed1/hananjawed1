import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskManagementComponent } from './add-task-management.component';

describe('AddTaskManagementComponent', () => {
  let component: AddTaskManagementComponent;
  let fixture: ComponentFixture<AddTaskManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
