import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { CatalogosService } from '../Services/catalogos.service';
import { SolicitudesService } from '../Services/solicitudes.service';
declare let $: any;


@Component({
  selector: 'app-mantenimiento-solicitudes',
  templateUrl: './mantenimiento-solicitudes.component.html',
  styleUrls: ['./mantenimiento-solicitudes.component.scss']
})
export class MantenimientoSolicitudesComponent implements OnInit {

  tipoSolicitud: any;
  estados: any;
  filtrosFormGroup: FormGroup;
  mostrarTabla: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  displayedColumns = ['codigo_solicitud', 'descripcion', 'fecha_creacion', 'nit', 'no_expediente', 'no_soporte'];
  dataSource = new MatTableDataSource();


  constructor(private catalogosService: CatalogosService,
              private _formBuilder: FormBuilder,
              private solicitudesService: SolicitudesService) {

    this.filtrosFormGroup = this._formBuilder.group({
      codigoSolicitudFormControl: ['', [Validators.pattern('([0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9][0-9][0-9][0-9])')]],
      noExpedienteFormControl: ['', [Validators.pattern('([0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9][0-9][0-9][0-9])')]],
      noSoporteFormControl: ['', [Validators.minLength(3)]],
      usuarioAsignacionFormControl: ['', Validators.minLength(8)],
      fechaDeFormControl: [''],
      fechaHastaFormControl: [''],
      nitFormControl: [''],
      tipoSolicitudFormControl: [''],
      estadoSolicitudFormControl: ['']
    });

    this.mostrarTabla = false;
  }

  ngOnInit(){
    // Obtener los tipos de solicitud
    this.catalogosService.getTipoSolicitud().subscribe(res => {
      this.tipoSolicitud = res;
      console.log(this.tipoSolicitud)
    });

    // Obtener los Estados
    this.catalogosService.getEstados().subscribe(res => {
      this.estados = res;
      console.log(this.estados)
    });

  }

  validarCodigoSolicitud() {
    if (this.filtrosFormGroup.get('codigoSolicitudFormControl')?.valid) {

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Debe ingresar un codigo de solicitud valido, como se muestra a continuacion: 9999-88-77-66-5555555 '
      })
    }
  }

  validarNoExpediente() {
    if (this.filtrosFormGroup.get('noExpedienteFormControl')?.valid) {

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Debe ingresar un numero de expediente valido, como se muestra a continuacion: 9999-88-77-66-5555555 '
      })
    }
  }

  validarNoSoporte() {
    if (this.filtrosFormGroup.get('noSoporteFormControl')?.valid) {

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Debe ingresar entre 3 a 50 valores alfanumericos'
      })
    }
  }

  validarUsuarioAsignacion() {
    if (this.filtrosFormGroup.get('usuarioAsignacionFormControl')?.valid) {

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Debe ingresar entre 8 a 12 caracteres'
      });
    }
  }

  validarFechaInicio() {
    if(this.filtrosFormGroup.get('fechaHastaFormControl')?.value === '') {
      
    } else {
      if(this.filtrosFormGroup.get('fechaDeFormControl')?.value > this.filtrosFormGroup.get('fechaHastaFormControl')?.value){
        this.filtrosFormGroup.get('fechaDeFormControl')?.reset();
        Swal.fire({
          icon: 'error',
          title: 'La fecha de inicio no puede ser mayor a la fecha fin.'
        });
      }
    }
  }

  validarFechaFin() {
    if(this.filtrosFormGroup.get('fechaDeFormControl')?.value === '') {
      
    } else {
      if(this.filtrosFormGroup.get('fechaHastaFormControl')?.value < this.filtrosFormGroup.get('fechaDeFormControl')?.value){
        this.filtrosFormGroup.get('fechaHastaFormControl')?.reset();
        Swal.fire({
          icon: 'error',
          title: 'La fecha de fin no puede ser menor a la fecha de inicio.'
        });
      }
    }
  }

  realizarBusqueda() {
    if (this.filtrosFormGroup.get('codigoSolicitudFormControl')?.value === '' &&
        this.filtrosFormGroup.get('noExpedienteFormControl')?.value === '' && 
        this.filtrosFormGroup.get('noSoporteFormControl')?.value === '' && 
        this.filtrosFormGroup.get('usuarioAsignacionFormControl')?.value === '' && 
        this.filtrosFormGroup.get('fechaDeFormControl')?.value === '' && 
        this.filtrosFormGroup.get('fechaHastaFormControl')?.value === '' && 
        this.filtrosFormGroup.get('nitFormControl')?.value === '' && 
        this.filtrosFormGroup.get('tipoSolicitudFormControl')?.value === '' && 
        this.filtrosFormGroup.get('estadoSolicitudFormControl')?.value === ''){


          Swal.fire('Debe ingresar datos para realizar una busqueda.', '', 'error')
        
    } else {
      let codigoSolicitud = this.filtrosFormGroup.get('codigoSolicitudFormControl')?.value;
      if (codigoSolicitud === ''){
        codigoSolicitud = '0';
      }

      let noExpediente = this.filtrosFormGroup.get('noExpedienteFormControl')?.value;
      if (noExpediente === '') {
        noExpediente = '0';
      }

      let noSoporte = this.filtrosFormGroup.get('noSoporteFormControl')?.value;
      if (noSoporte === '') {
        noSoporte = '0';
      }

      let usuarioAsignacion = this.filtrosFormGroup.get('usuarioAsignacionFormControl')?.value;
      if (usuarioAsignacion === '') {
        usuarioAsignacion = '0';
      }

      let nit = this.filtrosFormGroup.get('nitFormControl')?.value;
      if (nit === '') {
        nit = '0';
      }

      let tipoSolicitud = this.filtrosFormGroup.get('tipoSolicitudFormControl')?.value;
      if (tipoSolicitud === '') {
        tipoSolicitud = '0';
      }

      let estadoSolicitud = this.filtrosFormGroup.get('estadoSolicitudFormControl')?.value;
      if (estadoSolicitud === '') {
        estadoSolicitud = '0';
      }

      let fechaDe = String(moment(this.filtrosFormGroup.get('fechaDeFormControl')?.value).format('YYYY-MM-DD'));
      if (fechaDe === '') {
        fechaDe = '0';
      }
      console.log(fechaDe)

      let fechaHasta = this.filtrosFormGroup.get('fechaHastaFormControl')?.value;
      if (fechaHasta === '') {
        fechaHasta = '0';
      }

      this.solicitudesService.getSolicitudes(codigoSolicitud, noExpediente, noSoporte, usuarioAsignacion, nit, tipoSolicitud, estadoSolicitud, fechaDe, fechaHasta).subscribe(res => {
        if(res.length !== 0) {
          for(let i = 0; i< res.length; i++) {
            res[i].fecha_creacion = String(moment(res[i].fecha_creacion.replace('+0000', '')).format('DD-MM-YYYY'))
          }
          this.dataSource.data = res;
          this.mostrarTabla = true;
        } else {
          this.mostrarTabla = false;
          Swal.fire('No se encontraron resultados con los datos ingrsados, por favor verificar los datos.', '', 'error')
        }
      })
    }
  }

  limpiarCampos() {
    this.filtrosFormGroup.get('codigoSolicitudFormControl')?.setValue('');
    this.filtrosFormGroup.get('noExpedienteFormControl')?.setValue('');
    this.filtrosFormGroup.get('noSoporteFormControl')?.setValue('');
    this.filtrosFormGroup.get('usuarioAsignacionFormControl')?.setValue('');
    this.filtrosFormGroup.get('fechaDeFormControl')?.setValue('');
    this.filtrosFormGroup.get('fechaHastaFormControl')?.setValue('');
    this.filtrosFormGroup.get('nitFormControl')?.setValue(''); 
    this.filtrosFormGroup.get('tipoSolicitudFormControl')?.setValue('');
    this.filtrosFormGroup.get('estadoSolicitudFormControl')?.setValue('');
    this.mostrarTabla = false;
  }

}
