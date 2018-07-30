import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionToolbarComponent } from './inspection-toolbar.component';

describe('InspectionToolbarComponent', () => {
  let component: InspectionToolbarComponent;
  let fixture: ComponentFixture<InspectionToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
