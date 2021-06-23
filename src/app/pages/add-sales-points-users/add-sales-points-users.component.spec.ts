import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesPointsUsersComponent } from './add-sales-points-users.component';

describe('AddSalesPointsUsersComponent', () => {
  let component: AddSalesPointsUsersComponent;
  let fixture: ComponentFixture<AddSalesPointsUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalesPointsUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesPointsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
