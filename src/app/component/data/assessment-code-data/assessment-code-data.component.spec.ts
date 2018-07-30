import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentCodeDataComponent } from './assessment-code-data.component';

describe('AssessmentCodeTableComponent', () => {
  let component: AssessmentCodeDataComponent;
  let fixture: ComponentFixture<AssessmentCodeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentCodeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentCodeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
