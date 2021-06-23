import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientRequestComponent } from './view-client-request.component';

describe('ViewClientRequestComponent', () => {
  let component: ViewClientRequestComponent;
  let fixture: ComponentFixture<ViewClientRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClientRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClientRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
