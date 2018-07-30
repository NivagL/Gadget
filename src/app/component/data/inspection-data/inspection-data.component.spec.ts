import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionDataComponent } from './inspection-data.component';

describe('InspectionDataModelComponent', () => {
  let component: InspectionDataComponent;
  let fixture: ComponentFixture<InspectionDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
