import { HttpClient } from '@angular/common/http';
import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset = UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable()
export class SolicitudesService {

  baseUrl: string;
  constructor(private http:HttpClient) {
    this.baseUrl=environment.baseUrl;
  }

  public insertSolicitud(solicitud: any):Observable<any>{
    return this.http.post(`${this.baseUrl}/solicitudes/muestras/medicas`,solicitud)
  }

  public getSolicitudes(codigoSolicitud: any, no_expediente: any, no_soporte: any, usuario_asignacion: any, nit: any, codigo_tipo_solicitud: any, codigo_estado: any, fecha_inicio: any, fecha_fin: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/solicitudes/${codigoSolicitud}/${no_expediente}/${no_soporte}/${usuario_asignacion}/${nit}/${codigo_tipo_solicitud}/${codigo_estado}/${fecha_inicio}/${fecha_fin}`);
  }

  public getSolicitudesExcel(codigoSolicitud: any, no_expediente: any, no_soporte: any, usuario_asignacion: any, nit: any, codigo_tipo_solicitud: any, codigo_estado: any, fecha_inicio: any, fecha_fin: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/solicitudes/excel/${codigoSolicitud}/${no_expediente}/${no_soporte}/${usuario_asignacion}/${nit}/${codigo_tipo_solicitud}/${codigo_estado}/${fecha_inicio}/${fecha_fin}`);
  }

  public getSolicitudesByCodigo(codigoSolicitud: any):Observable<any>{
    return this.http.get(`${this.baseUrl}/solicitudes/${codigoSolicitud}`);
  }

  public exportToExcel(json:any[], excelFileName: string): void{
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: {'data': worksheet},
    SheetNames:['data']
    };
    const excelBuffer: any= XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
    // llamar al metodo
    this.saveExcel(excelBuffer, excelFileName);
  }

  private saveExcel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + new Date().getTime() + EXCEL_EXT);
  }
}
