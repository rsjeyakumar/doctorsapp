import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { PrimengModule } from '../../shared/primeng/primeng.module';

@NgModule({
  declarations: [LoginComponent, DashboardComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    SharedModule,
    PrimengModule
  ]
})
export class DoctorModule { }
