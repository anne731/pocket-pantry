import {
  NgModule
} from '@angular/core';

import {
  AppSkyModule
} from './app-sky.module';
import { AddItemComponent } from './add-item/add-item.component';
import { UserContext } from './user-context';
import { PocketPantryService } from './shared/services/pocketPantryService';

@NgModule({
  exports: [
    AppSkyModule
  ],
  entryComponents: [
    AddItemComponent
  ],
  providers: [
    UserContext,
    PocketPantryService
  ]
})
export class AppExtrasModule { }
