import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRequestUpdateComponent } from './client-request-update.component';

describe('ClientRequestUpdateComponent', () => {
  let component: ClientRequestUpdateComponent;
  let fixture: ComponentFixture<ClientRequestUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientRequestUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientRequestUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
