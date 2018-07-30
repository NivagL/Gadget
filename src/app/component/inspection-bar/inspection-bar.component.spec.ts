import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionBarComponent } from './inspection-bar.component';

describe('InspectionListBarComponent', () => {
  let component: InspectionBarComponent;
  let fixture: ComponentFixture<InspectionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
