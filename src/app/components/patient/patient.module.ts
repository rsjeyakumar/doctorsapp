import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { SearchComponent } from './search/search.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { SharedModule } from '../../shared/shared.module';
import { PrimengModule } from '../../shared/primeng/primeng.module';


@NgModule({
  declarations: [SearchComponent, AppointmentComponent],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    PrimengModule
  ]
})
export class PatientModule { }
