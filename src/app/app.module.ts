import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

// import { AppRoutingModule } from './@angular/routing.module';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core'
import { HttpModule } from '@angular/http';

//materials
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MatToolbar } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AppComponent } from './app.component';

//services
import { EquipmentService } from './service/equipment.service';
import { WorkPackService } from './service/work-pack.service';
import { ActivityService } from './service/activity.service';
import { TaskService } from './service/task.service';
import { ObservationService } from './service/observation.service';
import { AssessmentCodeService } from './service/assessment-code.service';
import { ConfigurationService } from './service/configuration.service';
import { InspectionService } from './service/inspection.service';
import { InspectionActivityService } from './service/inspection-activity.service';
import { InspectionObservationService } from './service/inspection-observation.service';
import { DateService } from './service/date.service';
import { InspectionPhotoService } from './service/inspection-photo.service';
import { InspectionStatusService } from './service/inspection-status.service';
import { InputDataService } from './service/input-data.service';
import { OutputDataService } from './service/output-data.service';
import { FilteredInspectionService } from './service/filtered-inspection.service';

//input data model
import { InputDataPageComponent } from './component/data/input-data-page/input-data-page.component';
import { EquipmentDataComponent } from './component/data/equipment-data/equipment-data.component';
import { WorkOrderDataComponent } from './component/data/work-order-data/work-order-data.component';
import { ActivityDataComponent } from './component/data/activity-data/activity-data.component';
import { TaskDataComponent } from './component/data/task-data/task-data.component';
import { ObservationDataComponent } from './component/data/observation-data/observation-data.component';
import { AssessmentCodeDataComponent } from './component/data/assessment-code-data/assessment-code-data.component';

//output data model
import { OutputDataPageComponent } from './component/data/output-data-page/output-data-page.component';
import { InspectionDataComponent } from './component/data/inspection-data/inspection-data.component';
import { InspectionActivityDataComponent } from './component/data/inspection-activity-data/inspection-activity-data.component';
import { InspectionObservationDataComponent } from './component/data/inspection-observation-data/inspection-observation-data.component';
import { InspectionPhotoDataComponent } from './component/data/inspection-photo-data/inspection-photo-data.component';

//work - page
import { WorkPageComponent } from './component/app-page/work-page/work-page.component';

//inspection-list - page
import { InspectionListPageComponent } from './component/app-page/inspection-list-page/inspection-list-page.component';
import { InspectionListComponent } from './component/inspection-list/inspection-list.component';
import { InspectionListMapComponent } from './component/map/inspection-map/inspection-map.component';

//inspection - page
import { InspectionPageComponent } from './component/app-page/inspection-page/inspection-page.component';
import { ObservationListComponent } from './component/observation-list/observation-list.component';
import { InspectionComponent } from './component/inspection/inspection.component';
import { AccessDialogComponent } from './component/access-dialog/access-dialog.component';
import { PhotoGalleryComponent } from './component/gallery/photo-gallery/photo-gallery.component';

//observations - simple
import { TextboxComponent } from './component/observation/simple/textbox/textbox.component';
import { CheckBoxComponent } from './component/observation/simple/check-box/check-box.component';
import { DatePickerComponent } from './component/observation/simple/date-picker/date-picker.component';
import { DropDownComponent } from './component/observation/simple/drop-down/drop-down.component';
import { SliderComponent } from './component/observation/simple/slider/slider.component';
import { ToggleComponent } from './component/observation/simple/toggle/toggle.component';
import { AssessmentCodeComponent } from './component/observation/assessment-code/assessment-code.component';
import { CodePickerComponent } from './component/observation/code-picker/code-picker.component';

//measurements
import { InsulationStageComponent } from './component/observation/measurement/insulation-stage/insulation-stage.component';
import { CapacitanceStageComponent } from './component/observation/measurement/capacitance-stage/capacitance-stage.component';
import { CapacitorBankInspectionComponent } from './component/observation/measurement/capacitor-bank-inspection/capacitor-bank-inspection.component';

//application
import { ConfirmDialogComponent } from './component/confirm-dialog/confirm-dialog.component';
import { ConfigDialogComponent } from './component/config-dialog/config-dialog.component';
import { AccountDialogComponent } from './component/account-dialog/account-dialog.component';
import { PhotoDialogComponent } from './component/gallery/photo-dialog/photo-dialog.component';
import { SyncProgressComponent } from './component/sync-progress/sync-progress.component';
import { TestPageComponent } from './component/app-page/test-page/test-page.component';

import { InspectionStatusComponent } from './component/inspection-status/inspection-status.component';
import { InspectionToolbarComponent } from './component/inspection-toolbar/inspection-toolbar.component';
import { InspectionBarComponent } from './component/inspection-bar/inspection-bar.component';
import { InspectionHeaderComponent } from './component/inspection-header/inspection-header.component';
import { WorkPackListComponent } from './component/work-pack-list/work-pack-list.component';
import { ActivityBarComponent } from './component/activity-bar/activity-bar.component';
import { PhotoGalleryLsComponent } from './component/gallery/photo-gallery-ls/photo-gallery-ls.component';
import { PhotoGallery3Component } from './component/gallery/photo-gallery-3/photo-gallery-3.component';
import { SdkMapComponent } from './component/map/sdk-map/sdk-map.component';
import { AgmMapComponent } from './component/map/agm-map/agm-map.component';
import { ActivityCompleteComponent } from './component/observation/activity-complete/activity-complete.component';
import { ArcgisMapComponent } from './component/map/arcgis-map/arcgis-map.component';
import { PhotoGallery4Component } from './component/gallery/photo-gallery-4/photo-gallery-4.component';


@NgModule({
  declarations: [
    AppComponent,
    EquipmentDataComponent,
    WorkOrderDataComponent,
    ActivityDataComponent,
    TaskDataComponent,
    ObservationDataComponent,
    AssessmentCodeDataComponent,
    InspectionListComponent,
    WorkPageComponent,
    InspectionListPageComponent,
    InspectionPageComponent,
    InputDataPageComponent,
    InspectionListMapComponent,
    ObservationListComponent,
    InspectionComponent,
    AccessDialogComponent,
    CheckBoxComponent,
    DatePickerComponent,
    DropDownComponent,
    SliderComponent,
    TextboxComponent,
    ToggleComponent,
    PhotoGalleryComponent,
    InsulationStageComponent,
    CapacitanceStageComponent,
    CapacitorBankInspectionComponent,
    OutputDataPageComponent,
    InspectionDataComponent,
    InspectionActivityDataComponent,
    InspectionObservationDataComponent,
    AssessmentCodeComponent,
    ConfirmDialogComponent,
    ConfigDialogComponent,
    AccountDialogComponent,
    PhotoDialogComponent,
    SyncProgressComponent,
    InspectionPhotoDataComponent,
    CodePickerComponent,
    TestPageComponent,
    InspectionStatusComponent,
    InspectionToolbarComponent,
    InspectionBarComponent,
    InspectionHeaderComponent,
    WorkPackListComponent,
    ActivityBarComponent,
    PhotoGalleryLsComponent,
    PhotoGallery3Component,
    SdkMapComponent,
    AgmMapComponent,
    ActivityCompleteComponent,
    ArcgisMapComponent,
    PhotoGallery4Component,
    ],
  imports: [
    BrowserModule, 
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,  
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD8V-SvorT3WRs5MGBo6j8kiD4W7j8G_f0'
    }),
    MatTableModule,
    MatListModule,
    MatCardModule,
    MatTabsModule, 
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatGridListModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatChipsModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatButtonModule,
  ],
  providers: [
    EquipmentService,
    WorkPackService,
    ActivityService,
    TaskService,
    ObservationService,
    AssessmentCodeService,
    ConfigurationService,
    InspectionService,
    InspectionActivityService,
    InspectionObservationService,
    DateService,
    InspectionPhotoService,
    InspectionStatusService,
    InputDataService,
    OutputDataService,
    FilteredInspectionService,
    GoogleMapsAPIWrapper,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AccessDialogComponent,
    ConfirmDialogComponent,
    ConfigDialogComponent,
    AccountDialogComponent,
    PhotoDialogComponent,
    PhotoGalleryComponent,
    PhotoGalleryLsComponent,
    PhotoGallery3Component,
    PhotoGallery4Component,
  ]
})
export class AppModule { }
