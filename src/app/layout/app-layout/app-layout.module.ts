import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppLayoutRoutes } from './app-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { InitialsPipe } from '../../../pipes/initials.pipe';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { MaxItemsPipe } from '../../../pipes/maxitems.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AppLayoutRoutes),
    FormsModule,
    HttpClientModule,
  ],
  declarations: [DashboardComponent, InitialsPipe, FilterPipe, MaxItemsPipe],
})
export class AppLayoutModule {}
