import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreacionSolicitudComponent } from './creacion-solicitud/creacion-solicitud.component';

const routes: Routes = [
  {path: 'creacionSolicitud', component: CreacionSolicitudComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
