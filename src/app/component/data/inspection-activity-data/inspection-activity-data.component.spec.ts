import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionActivityDataComponent } from './inspection-activity-data.component';

describe('InspectionDetailsDataModelComponent', () => {
  let component: InspectionActivityDataComponent;
  let fixture: ComponentFixture<InspectionActivityDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionActivityDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionActivityDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
