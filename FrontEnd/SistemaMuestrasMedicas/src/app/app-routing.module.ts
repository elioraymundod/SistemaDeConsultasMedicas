import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsociarComponent } from './asociar/asociar.component';
import { CreacionSolicitudComponent } from './creacion-solicitud/creacion-solicitud.component';
import { CrearMuestraComponent } from './crear-muestra/crear-muestra.component';
import { InformacionClienteComponent } from './mantenimiento-solicitudes/informacion-cliente/informacion-cliente.component';
import { InformacionExpedienteComponent } from './mantenimiento-solicitudes/informacion-expediente/informacion-expediente.component';
import { InformacionGeneralComponent } from './mantenimiento-solicitudes/informacion-general/informacion-general.component';
import { MantenimientoSolicitudesComponent } from './mantenimiento-solicitudes/mantenimiento-solicitudes.component';
import { TrazabilidadComponent } from './mantenimiento-solicitudes/trazabilidad/trazabilidad.component';

const routes: Routes = [
  {path: 'creacionSolicitud', component: CreacionSolicitudComponent},
  {path:'crearMuestra',component: CrearMuestraComponent},
  {path:'asociar/:codigo_solicitud',component: AsociarComponent},
  {path: 'mantenimiento-solicitudes', component: MantenimientoSolicitudesComponent},
  {path: 'mantenimiento-solicitudes/informacion-cliente/:codigo_solicitud', component: InformacionClienteComponent},
  {path: 'mantenimiento-solicitudes/informacion-expediente/:codigo_solicitud', component: InformacionExpedienteComponent},
  {path: 'mantenimiento-solicitudes/informacion-general/:codigo_solicitud', component: InformacionGeneralComponent},
  {path: 'mantenimiento-solicitudes/trazabilidad', component: TrazabilidadComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
