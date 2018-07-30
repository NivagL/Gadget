import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionListPageComponent } from './inspection-list-page.component';

describe('WorkPageComponent', () => {
  let component: InspectionListPageComponent;
  let fixture: ComponentFixture<InspectionListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
