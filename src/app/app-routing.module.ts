import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//route views
import { WorkPageComponent } from './component/app-page/work-page/work-page.component';
import { InspectionListPageComponent } from './component/app-page/inspection-list-page/inspection-list-page.component';
import { InspectionPageComponent } from './component/app-page/inspection-page/inspection-page.component';
import { InputDataPageComponent } from './component/data/input-data-page/input-data-page.component';
import { OutputDataPageComponent } from './component/data/output-data-page/output-data-page.component';
import { TestPageComponent } from './component/app-page/test-page/test-page.component';

const routes: Routes = [
    {
        path: '',
        component: WorkPageComponent
    },
    {
        path: 'work',
        component: WorkPageComponent
    },
    {
        path: 'list',
        component: InspectionListPageComponent
    },
    {
        path: 'inspection',
        component: InspectionPageComponent
    },
    {
        path: 'input',
        component: InputDataPageComponent
    },
    {
        path: 'output',
        component: OutputDataPageComponent
    },
    {
        path: 'test',
        component: TestPageComponent
    },
    
    { path: '**', redirectTo: 'work' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }