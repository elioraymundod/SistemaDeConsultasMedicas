import { HttpClient } from '@angular/common/http';
import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
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

  public getSolicitudes(codigoSolicitud: any, no_expediente: any, no_soporte: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/solicitudes/${codigoSolicitud}/${no_expediente}/${no_soporte}`);
  }

  public getSolicitudesByCodigo(codigoSolicitud: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/solicitudes/${codigoSolicitud}`);
  }

  
}
