import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFileOpeningComponent } from './view-file-opening.component';

describe('ViewFileOpeningComponent', () => {
  let component: ViewFileOpeningComponent;
  let fixture: ComponentFixture<ViewFileOpeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFileOpeningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFileOpeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
