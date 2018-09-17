import { BootstrapModule } from './../../bootstap.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NavigationComponent } from './navigation.component';
import { NavigationService } from './navigation.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    BootstrapModule
  ],
  providers: [NavigationService],
  declarations: [NavigationComponent],
  entryComponents: [NavigationComponent],
  exports: [NavigationComponent]
})
export class NavigationModule {}