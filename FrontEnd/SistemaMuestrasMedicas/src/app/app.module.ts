import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './angular-material';
import { ReactiveFormsModule } from '@angular/forms';
import { CreacionSolicitudComponent } from './creacion-solicitud/creacion-solicitud.component';
import { CatalogosService } from './Services/catalogos.service';
import { HttpClientModule } from '@angular/common/http';
import { CrearMuestraComponent } from './crear-muestra/crear-muestra.component';
import { AsociarComponent } from './asociar/asociar.component';
import { DatePipe } from '@angular/common';
import { ClientesService } from './Services/clientes.service';
import { ExpedientesService } from './Services/expedientes.service';
import { SolicitudesService } from './Services/solicitudes.service';

@NgModule({
  declarations: [
    AppComponent,
    CreacionSolicitudComponent,
    CrearMuestraComponent,
    AsociarComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CatalogosService,
    ClientesService,
    ExpedientesService,
    SolicitudesService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
