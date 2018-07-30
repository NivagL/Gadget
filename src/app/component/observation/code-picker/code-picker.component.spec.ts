import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePickerComponent } from './code-picker.component';

describe('CodePickerComponent', () => {
  let component: CodePickerComponent;
  let fixture: ComponentFixture<CodePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
