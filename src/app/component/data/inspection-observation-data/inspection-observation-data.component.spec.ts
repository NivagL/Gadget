import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionObservationDataComponent } from './inspection-observation-data.component';

describe('InspectionObservationDataModelComponent', () => {
  let component: InspectionObservationDataComponent;
  let fixture: ComponentFixture<InspectionObservationDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionObservationDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionObservationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
