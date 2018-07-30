import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionPageComponent } from './inspection-page.component';

describe('InspectionPageComponent', () => {
  let component: InspectionPageComponent;
  let fixture: ComponentFixture<InspectionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
