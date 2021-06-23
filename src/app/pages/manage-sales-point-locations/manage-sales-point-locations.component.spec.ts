import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSalesPointLocationsComponent } from './manage-sales-point-locations.component';

describe('ManageSalesPointLocationsComponent', () => {
  let component: ManageSalesPointLocationsComponent;
  let fixture: ComponentFixture<ManageSalesPointLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSalesPointLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSalesPointLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
