import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { SearchComponent } from './search/search.component';
import { AppointmentComponent } from './appointment/appointment.component';


@NgModule({
  declarations: [SearchComponent, AppointmentComponent],
  imports: [
    CommonModule,
    PatientRoutingModule
  ]
})
export class PatientModule { }
