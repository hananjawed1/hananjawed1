import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUaeAreasComponent } from './manage-uae-areas.component';

describe('ManageUaeAreasComponent', () => {
  let component: ManageUaeAreasComponent;
  let fixture: ComponentFixture<ManageUaeAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUaeAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUaeAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
