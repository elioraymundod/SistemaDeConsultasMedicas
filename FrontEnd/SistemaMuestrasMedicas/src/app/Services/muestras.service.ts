import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MuestrasService {

  baseUrl: string;
  constructor(private http:HttpClient) {
    this.baseUrl=environment.baseUrl;
  }
  public getMuestraByCodigoMuestra(codigoMuestra: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/muestras/${codigoMuestra}`);
  }

  public getAllSolicitudes():Observable<any>{
    return this.http.get(`${this.baseUrl}/obtener/all/solicitudes/creadas`);
  }
}
