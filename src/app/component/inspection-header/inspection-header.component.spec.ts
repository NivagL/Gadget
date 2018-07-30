import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionHeaderComponent } from './inspection-header.component';

describe('InspectionHeaderComponent', () => {
  let component: InspectionHeaderComponent;
  let fixture: ComponentFixture<InspectionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
