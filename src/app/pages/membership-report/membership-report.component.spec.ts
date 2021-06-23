import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipReportComponent } from './membership-report.component';

describe('MembershipReportComponent', () => {
  let component: MembershipReportComponent;
  let fixture: ComponentFixture<MembershipReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
