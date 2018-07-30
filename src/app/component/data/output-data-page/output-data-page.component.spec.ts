import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputDataPageComponent } from './output-data-page.component';

describe('OutputDataModelPageComponent', () => {
  let component: OutputDataPageComponent;
  let fixture: ComponentFixture<OutputDataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputDataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
