import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInspectionRequestComponent } from './manage-inspection-request.component';

describe('ManageInspectionRequestComponent', () => {
  let component: ManageInspectionRequestComponent;
  let fixture: ComponentFixture<ManageInspectionRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageInspectionRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageInspectionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
