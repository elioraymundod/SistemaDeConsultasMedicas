import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  baseUrl: string;
  constructor(private http:HttpClient) {
    this.baseUrl=environment.baseUrl;
  }

  public insertSolicitud(solicitud: any):Observable<any>{
    return this.http.post(`${this.baseUrl}/solicitudes/muestras/medicas`,solicitud)
  }

  public getSolicitudes(codigoSolicitud: any, noExpediente: any, noSoporte: any, usuarioAsignacion: any, fechaInicio: any, fechaFin: any, nit: any,
    codigoTipoSolicitud: any, codigoEstado: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/solicitudes/${codigoSolicitud}/${noExpediente}/${noSoporte}/${usuarioAsignacion}/${fechaInicio}/${fechaFin}/${nit}/${codigoTipoSolicitud}/${codigoEstado}`);
  }

  public getSolicitudesByCodigo(codigoSolicitud: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/solicitudes/${codigoSolicitud}`);
  }

  
}
