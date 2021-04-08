import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    this.solicitudesService.getSolicitudes(1, null, null, null, null, null, null, null, null).subscribe(res => {
      console.log('La solicitud es ', res)
    })
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

}
