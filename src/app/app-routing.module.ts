import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../app/services/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'patient',
    pathMatch: 'full'
  },
  {
    path: 'patient',
    loadChildren: () => import(`./components/patient/patient.module`).then(m => m.PatientModule)
  },
  {
    path: 'doctor',
    loadChildren: () => import(`./components/doctor/doctor.module`).then(m => m.DoctorModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
