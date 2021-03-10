import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreacionSolicitudComponent } from './creacion-solicitud/creacion-solicitud.component';
import { CrearMuestraComponent } from './crear-muestra/crear-muestra.component';

const routes: Routes = [
  {path: 'creacionSolicitud', component: CreacionSolicitudComponent},
  {path:'crearMuestra',component: CrearMuestraComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
