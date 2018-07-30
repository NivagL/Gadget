import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentCodeComponent } from './assessment-code.component';

describe('AssessmentCodeComponent', () => {
  let component: AssessmentCodeComponent;
  let fixture: ComponentFixture<AssessmentCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
