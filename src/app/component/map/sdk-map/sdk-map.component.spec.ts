import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdkMapComponent } from './sdk-map.component';

describe('SdkMapComponent', () => {
  let component: SdkMapComponent;
  let fixture: ComponentFixture<SdkMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdkMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdkMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
