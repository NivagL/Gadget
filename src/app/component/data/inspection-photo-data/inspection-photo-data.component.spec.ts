import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionPhotoDataComponent } from './inspection-photo-data.component';

describe('InspectionPhotoDataComponent', () => {
  let component: InspectionPhotoDataComponent;
  let fixture: ComponentFixture<InspectionPhotoDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionPhotoDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionPhotoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
