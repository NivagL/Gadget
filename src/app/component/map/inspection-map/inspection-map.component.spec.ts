import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionListMapComponent } from './inspection-map.component';

describe('GoogleMapComponent', () => {
  let component: InspectionListMapComponent;
  let fixture: ComponentFixture<InspectionListMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionListMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionListMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
