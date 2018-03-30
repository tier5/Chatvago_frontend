import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

/**
 * @constant dashBoardRoutes
 */
const dashBoardRoutes: Routes = [
  {path: '', component: DashboardComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashBoardRoutes)
  ],
  exports: [RouterModule]
})

export class DashboardRoutingModule {}
