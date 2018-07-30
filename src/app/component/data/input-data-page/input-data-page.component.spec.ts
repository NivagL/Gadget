import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDataPageComponent } from './input-data-page.component';

describe('TablePageComponent', () => {
  let component: InputDataPageComponent;
  let fixture: ComponentFixture<InputDataPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDataPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
