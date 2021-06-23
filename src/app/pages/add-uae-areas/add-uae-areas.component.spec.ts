import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUaeAreasComponent } from './add-uae-areas.component';

describe('AddUaeAreasComponent', () => {
  let component: AddUaeAreasComponent;
  let fixture: ComponentFixture<AddUaeAreasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUaeAreasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUaeAreasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
