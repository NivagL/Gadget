import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGalleryLsComponent } from './photo-gallery-ls.component';

describe('PhotoGalleryLsComponent', () => {
  let component: PhotoGalleryLsComponent;
  let fixture: ComponentFixture<PhotoGalleryLsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoGalleryLsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoGalleryLsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
