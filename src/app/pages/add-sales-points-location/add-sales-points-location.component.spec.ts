import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesPointsLocationComponent } from './add-sales-points-location.component';

describe('AddSalesPointsLocationComponent', () => {
  let component: AddSalesPointsLocationComponent;
  let fixture: ComponentFixture<AddSalesPointsLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalesPointsLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSalesPointsLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
