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

@NgModule({
  declarations: [
    AppComponent,
    CreacionSolicitudComponent,
    CrearMuestraComponent 
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
    CatalogosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
