import {
  NgModule
} from '@angular/core';

import {
  SkyAvatarModule
} from '@skyux/avatar';

import {
  SkyAlertModule,
  SkyKeyInfoModule
} from '@skyux/indicators';

import {
  SkyFluidGridModule
} from '@skyux/layout';

import {
  SkyNavbarModule
} from '@skyux/navbar';

import {
  SkyListToolbarModule
} from '@skyux/list-builder';

import {
  SkyListModule
} from '@skyux/list-builder';

import {
  SkyDropdownModule
} from '@skyux/popovers';

import {
  SkyListFiltersModule
} from '@skyux/list-builder';

import {
  SkyIconModule
} from '@skyux/indicators';

import {
  SkyRadioModule
} from '@skyux/forms';

import {
  SkyGridModule
} from '@skyux/grids';

import {
  SkyFilterModule
} from '@skyux/lists';

import {
  SkyListViewGridModule
} from '@skyux/list-builder-view-grids';

import {
  SkyListViewChecklistModule
} from '@skyux/list-builder-view-checklist';

import {
  SkyAppLinkModule
} from '@skyux/router';

@NgModule({
  exports: [
    SkyAvatarModule,
    SkyAlertModule,
    SkyKeyInfoModule,
    SkyFluidGridModule,
    SkyNavbarModule,
    SkyListToolbarModule,
    SkyListModule,
    SkyDropdownModule,
    SkyListFiltersModule,
    SkyIconModule,
    SkyRadioModule,
    SkyGridModule,
    SkyFilterModule,
    SkyListViewGridModule,
    SkyListViewChecklistModule,
    SkyAppLinkModule
  ]
})
export class AppSkyModule { }
