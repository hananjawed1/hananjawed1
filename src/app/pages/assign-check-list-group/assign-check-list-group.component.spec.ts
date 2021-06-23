import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignCheckListGroupComponent } from './assign-check-list-group.component';

describe('AssignCheckListGroupComponent', () => {
  let component: AssignCheckListGroupComponent;
  let fixture: ComponentFixture<AssignCheckListGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignCheckListGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignCheckListGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
