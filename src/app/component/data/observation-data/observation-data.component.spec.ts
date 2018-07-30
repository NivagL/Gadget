import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationDataComponent } from './observation-data.component';

describe('ObservationTableComponent', () => {
  let component: ObservationDataComponent;
  let fixture: ComponentFixture<ObservationDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
