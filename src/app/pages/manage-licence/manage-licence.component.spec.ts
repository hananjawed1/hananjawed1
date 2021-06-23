import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLicenceComponent } from './manage-licence.component';

describe('ManageLicenceComponent', () => {
  let component: ManageLicenceComponent;
  let fixture: ComponentFixture<ManageLicenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageLicenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
