import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { SolicitudesService } from 'src/app/Services/solicitudes.service';

@Component({
  selector: 'app-trazabilidad',
  templateUrl: './trazabilidad.component.html',
  styleUrls: ['./trazabilidad.component.scss']
})
export class TrazabilidadComponent implements OnInit {

  nitLogin: any;
  codigoSolicitud: any;
  dataSource = new MatTableDataSource();
  displayedColumns = ['codigo_solicitud', 'estado_solicitud', 'enviado_por',  'fecha', 'duracion', 'acumulado'];
  date: Date;

  constructor(private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private solicitudesService: SolicitudesService,
    private router: Router) {

      this.date = new Date();
    }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(async res => {
      if(res.has('codigo_solicitud')) {
        this.codigoSolicitud = res.get('codigo_solicitud');
        this.nitLogin = res.get('nit_login');
        console.log(this.nitLogin)
      }
    })

    this.solicitudesService.getHistorialEstados(this.codigoSolicitud).subscribe(res => {
      let diasAcumulado = 0;
      let horasAcumulado = 0;
      let minutosAcumulado = 0;
        for(let i = 0; i < res.length; i++) {
          let fecha;
          res[i].fecha_creacion = moment(res[i].fecha_creacion.replace('+0000', '')).format('DD-MM-YYYY HH:mm:ss')
          fecha = moment(this.date).format('DD-MM-YYYY HH:mm:ss');
          let dias = Math.trunc(moment(fecha).diff(res[i].fecha_creacion, 'days', true));
          let horas = Math.trunc(moment(fecha).diff(res[i].fecha_creacion, 'hours', true));
          let minutos = Math.trunc(moment(fecha).diff(res[i].fecha_creacion, 'minutes', true));
          diasAcumulado += dias;
          horasAcumulado += horas;
          minutosAcumulado += minutos;
          
          res[i].duracion = `Dias: ${dias}, Horas: ${horas}, Minutos: ${minutos}`
          res[i].acumulado = `Dias: ${diasAcumulado}, Horas: ${horasAcumulado}, Minutos: ${minutosAcumulado}`
        }
        this.dataSource.data = res;
        console.log(res)
    })
  }

  obtenerDiferenciaFechas() {

  }

  regresarAMantenimientoSolicitudes() {
    this.router.navigate(['mantenimiento-solicitudes/', this.nitLogin]);
  }
}
