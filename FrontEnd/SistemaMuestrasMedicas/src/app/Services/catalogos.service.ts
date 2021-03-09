import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseUrl
  }

  public getTipoSolicitante(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tipoSolicitante`)
  }

}
