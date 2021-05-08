import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { SolicitudesService } from '../Services/solicitudes.service';

@Component({
  selector: 'app-cambio-estado',
  templateUrl: './cambio-estado.component.html',
  styleUrls: ['./cambio-estado.component.scss']
})
export class CambioEstadoComponent implements OnInit {
  informacionFormGroup: FormGroup;
  nitCentralizador: any;
  nombreCentralizador: any;
  codigoSolicitud: any;
  date: Date;
  codigoEstado: any;
  nitLogin: any;

  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private solicitudesService: SolicitudesService,
              private datePipe: DatePipe) {
    this.informacionFormGroup = this._formBuilder.group({
      codigoSolicitudFormControl: [''],
      descripcionFormControl: [''],
      estadoActualFormControl: [''],
      nuevoEstadoFormControl: ['']
    });

    this.date = new Date();
   }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async res => {
      if(res.has('codigo_solicitud')) {
        this.codigoSolicitud = res.get('codigo_solicitud');
        this.nitLogin = res.get('nit_login')
        this.solicitudesService.getSolicitudes(this.codigoSolicitud, '0', '0', '0', '0', '0', '0', '0', '0').subscribe(res => {
          if(res.length !== 0) {
            for(let i = 0; i< res.length; i++) {
              res[i].fecha_creacion = String(moment(res[i].fecha_creacion.replace('+0000', '')).format('DD-MM-YYYY'))
            }
            console.log(res)
            this.informacionFormGroup.get('codigoSolicitudFormControl')?.setValue(this.codigoSolicitud);
            this.informacionFormGroup.get('descripcionFormControl')?.setValue(res[0].descripcion);
            this.informacionFormGroup.get('estadoActualFormControl')?.setValue(res[0].estado)
            this.codigoEstado = res[0].codigo_estado;
            switch(res[0].codigo_estado) {
              
              case 8:
                this.informacionFormGroup.get('nuevoEstadoFormControl')?.setValue("Enviado");
                break;

              case 9:
                this.informacionFormGroup.get('nuevoEstadoFormControl')?.setValue("Asignado");
                break;



            }
          }
        })
      }
    })
  }

  cambiarEstado() {
    switch(this.codigoEstado) {
      case 8:
      this.enviar();
      break;
      case 9:
      this.asignar();
      break;
    }
  }

  asignar() {
    this.solicitudesService.getCentralizador().subscribe(res => {
      this.nitCentralizador = res[0].nit_usuario
      this.nombreCentralizador = res[0].nombre_usuario
      const solicitud = {
        codigo_solicitud: this.codigoSolicitud,
        usuario_asignacion: this.nitCentralizador,
        codigo_estado: 10,
        fecha_modificacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
        usuario_modificacion: 'master',
        ip_usuario_modificacion: '192.168.1.18'
      }
      console.log(solicitud)
      this.solicitudesService.asignarSolicitud(solicitud).subscribe(res => {
        Swal.fire({
          titleText: `El cambio de estado a la solicitud se realizó con éxito. Se ha asignado la solicitud al centralizador con los siguientes datos:`,
          html: `<b>NIT: </b> ${this.nitCentralizador} <br> <b>Nombre: </b> ${this.nombreCentralizador}`,
          icon: 'success',
          showCloseButton: true,
          showConfirmButton: false
        });
      });

      const historial = {
        codigo_historial: 0,
        codigo_solicitud: this.codigoSolicitud,
        usuario: '100255426',
        codigo_estado: 10,
        fecha_creacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
        usuario_creacion: 'master',
        ip_usuario_creacion: '192.168.1.18',
        fecha_modificacion: null,
        usuario_modificacion: null,
        ip_usuario_modificacion: null
      }
      this.solicitudesService.insertHistorial(historial).subscribe(res => {
        console.log('se creo correctamente el historial, ', historial)
      }, err => {
        Swal.fire('No se pudo almacenar la solicitud', '', 'error')
      });
      this.regresarAMantenimientoSolicitudes();
    })
  }

  enviar() {
    const solicitud = {
      codigo_solicitud: this.codigoSolicitud,
      usuario_asignacion: null,
      codigo_estado: 9,
      fecha_modificacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
      usuario_modificacion: 'master',
      ip_usuario_modificacion: '192.168.1.18'
    }
    this.solicitudesService.asignarSolicitud(solicitud).subscribe(res => {
      Swal.fire({
        titleText: `El cambio de estado a la solicitud se realizó con éxito.`,
        icon: 'success',
        showCloseButton: true,
        showConfirmButton: false
      });
    });
    const historial = {
      codigo_historial: 0,
      codigo_solicitud: this.codigoSolicitud,
      usuario: '100255426',
      codigo_estado: 9,
      fecha_creacion: this.datePipe.transform(this.date, 'yyyy-MM-dd HH:mm:ss'),
      usuario_creacion: 'master',
      ip_usuario_creacion: '192.168.1.18',
      fecha_modificacion: null,
      usuario_modificacion: null,
      ip_usuario_modificacion: null
    }
    this.solicitudesService.insertHistorial(historial).subscribe(res => {
      console.log('se creo correctamente el historial, ', historial)
    }, err => {
      Swal.fire('No se pudo almacenar la solicitud', '', 'error')
    });
    this.regresarAMantenimientoSolicitudes();
  }

  regresarAMantenimientoSolicitudes() {
    this.router.navigate(['mantenimiento-solicitudes/', this.nitLogin]);
  }

}
