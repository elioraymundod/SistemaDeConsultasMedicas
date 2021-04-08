import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsociarComponent } from './asociar/asociar.component';
import { CreacionSolicitudComponent } from './creacion-solicitud/creacion-solicitud.component';
import { CrearMuestraComponent } from './crear-muestra/crear-muestra.component';
import { MantenimientoSolicitudesComponent } from './mantenimiento-solicitudes/mantenimiento-solicitudes.component';

const routes: Routes = [
  {path: 'creacionSolicitud', component: CreacionSolicitudComponent},
  {path:'crearMuestra',component: CrearMuestraComponent},
  {path:'Asociar',component: AsociarComponent},
  {path: 'mantenimiento-solicitudes', component: MantenimientoSolicitudesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
