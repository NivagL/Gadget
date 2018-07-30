import { ChangeDetectorRef, Injectable } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable()
export class ScreenSizeService {
  size: BehaviorSubject<string>; //desktop/tablet/mobile

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) { 
    this.size = new BehaviorSubject<string>('desktop');

    this.mobileQuery = media.matchMedia('(max-width: 1024px)');
    this.mobileQuery = media.matchMedia('(max-width: 767px)');
    this.mobileQuery = media.matchMedia('(max-width: 480px)');

    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }



}
