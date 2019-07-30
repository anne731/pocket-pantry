import {
  NgModule
} from '@angular/core';

import {
  AppSkyModule
} from './app-sky.module';
import { AddItemComponent } from './add-item/add-item.component';

@NgModule({
  exports: [
    AppSkyModule
  ],
  entryComponents: [
    AddItemComponent
  ]
})
export class AppExtrasModule { }
