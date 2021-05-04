import { DatePipe } from '@angular/common';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { CatalogosService } from '../Services/catalogos.service';
import { ClientesService } from '../Services/clientes.service';
import { ExpedientesService } from '../Services/expedientes.service';
import { MuestrasService } from '../Services/muestras.service';
import { SolicitudesService } from '../Services/solicitudes.service';

@Component({
  selector: 'app-creacion-solicitud',
  templateUrl: './creacion-solicitud.component.html',
  styleUrls: ['./creacion-solicitud.component.scss']
})
export class CreacionSolicitudComponent implements OnInit {

  isLinear = false;
  crearSolicitudFormGroup: FormGroup;
  soporteYContactoFormGroup: FormGroup;
  tipoSolicitante: any;
  expediente: any;
  cliente: any;
  soporteInterno: any;
  soporteExterno: any;
  tipoSoporte: any;
  date: Date;
  tipoSolicitud: any;
  cantidadSolicitudes: any;
  numeroSolicitud: any;  

  constructor(private _formBuilder: FormBuilder, 
              private catalogosService: CatalogosService,
              private expedientesService: ExpedientesService,
              private clientesService: ClientesService,
              private solicitudesService: SolicitudesService,
              private muestrasService: MuestrasService,
              private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe,
              private router: Router) {
    this.crearSolicitudFormGroup = this._formBuilder.group({
      tipoSolicitanteFormControl: ['', [Validators.required]], 
      tipoSolicitudFormControl: ['', [Validators.required]], 
      noExpedienteFormControl: ['', [Validators.required, Validators.minLength(21)]], 
      descripcionFormControl: ['', [Validators.required, Validators.minLength(10)]], 
      nitFormControl: ['', []],
       nombreFormControl: ['', []]
    });

    this.soporteYContactoFormGroup = this._formBuilder.group({
      tipoSoporteFormControl: ['', [Validators.required]],
      numeroSoporteFormControl: ['', [Validators.required]],
      telefonosFormControl: ['', [Validators.required]],
      emailFormControl: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]]
    });

    this.date = new Date();

   }

  async ngOnInit() {
    // Obtener tipo de solicitante
    await this.catalogosService.getTipoSolicitante().subscribe(res => {
      this.tipoSolicitante = res;
      console.log(this.tipoSolicitante)
    });

    // Obtener tipos de soporte cuando el usuario es interno
    await this.expedientesService.getTipoSoporteInterno().subscribe(res => {
      this.soporteInterno = res;
      console.log(this.soporteInterno)
    });

    // Obtener tipos de soporte cuando el usuario es externo
    await this.expedientesService.getTipoSoporteExterno().subscribe(res => {
      this.soporteExterno = res;
      console.log(this.soporteExterno)
    });

    // Obtener los tipos de solicitud
    await this.catalogosService.getTipoSolicitud().subscribe(res => {
      this.tipoSolicitud = res;
      console.log(this.tipoSolicitud)
    });

    // Obtener cantidad solicitudes
    await this.muestrasService.getAllSolicitudes().subscribe(res => {
      this.cantidadSolicitudes = res.length;
      console.log('la cantidad de solicitudes es ', this.cantidadSolicitudes)
    });
    
    
  }

  /**
   * Metodo para obtener expedientes en base a un numero de expediente
   */
  async getExpediente() {
    let noExpediente = this.crearSolicitudFormGroup.get('noExpedienteFormControl')?.value;
    await this.expedientesService.getExpedienteByNoExpediente(noExpediente).subscribe(res => {
      this.expediente = res;
      console.log('res', res)
      if (res.length !== 0) {
        this.crearSolicitudFormGroup.get('nitFormControl')?.setValue(this.expediente[0].nit_cliente)
        console.log(this.expediente[0].nit_cliente)
        this.clientesService.getClientesByNit(this.expediente[0].nit_cliente).subscribe(res => {
          this.crearSolicitudFormGroup.get('nombreFormControl')?.setValue(res[0].nombre_cliente);
        });
       } else {
        Swal.fire({
          icon: 'error',
          title: 'No se encontro ningun expediente con el numero proporcionado'
        })
       }
    });    
  }

  /**
   * Metodo para setear el tipo de soporte, si el usuario selecciona interno o externo
   */
  enviarTipoDeSoporte() {
    let tipoSolicitante = this.crearSolicitudFormGroup.get('tipoSolicitanteFormControl')?.value;
    console.log(tipoSolicitante)
    if (tipoSolicitante === 24) {
      this.tipoSoporte = this.soporteInterno;
      console.log(this.tipoSoporte)
    } else if (tipoSolicitante === 25) {
      this.tipoSoporte = this.soporteExterno;
      console.log(this.tipoSoporte)
    }
    this.soporteYContactoFormGroup.get('tipoSoporteFormControl')?.reset();
  }

  /**
   * Metodo para guardar una solicitud
   */
  guardarSolicitud() {
    Swal.fire({
      title: '¿Desea crear la solicitud?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Guardar`,
      denyButtonText: `No guardar`,
      cancelButtonText: `Cancelar`, 
    }).then((result) => {
      if (result.isConfirmed) {
            this.generarCodigo();
          const solicitud = {
            codigo_solicitud: this.numeroSolicitud,
            codigo_tipo_solicitante: this.crearSolicitudFormGroup.get('tipoSolicitanteFormControl')?.value,
            codigo_tipo_solicitud: this.crearSolicitudFormGroup.get('tipoSolicitudFormControl')?.value,
            no_expediente: this.crearSolicitudFormGroup.get('noExpedienteFormControl')?.value,
            codigo_tipo_soporte: this.soporteYContactoFormGroup.get('tipoSoporteFormControl')?.value,
            codigo_estado: 8,
            usuario_asignacion: '44880459848',
            no_soporte: this.soporteYContactoFormGroup.get('numeroSoporteFormControl')?.value,
            nit: this.crearSolicitudFormGroup.get('nitFormControl')?.value,
            cantidad_de_muestras: 0,
            dias_de_items: 0,
            dias_vencimiento: 0,
            descripcion: this.crearSolicitudFormGroup.get('descripcionFormControl')?.value,
            telefonos: this.soporteYContactoFormGroup.get('telefonosFormControl')?.value,
            email: this.soporteYContactoFormGroup.get('emailFormControl')?.value,
            fecha_creacion: this.datePipe.transform(this.date, 'yyyy-MM-dd'),
            usuario_creacion: 'master',
            ip_usuario_creacion: '0.0.0.0',
            fecha_modificacion: null,
            usuario_modificacion: '',
            ip_usuario_modificacion: ''
          }
       this.solicitudesService.insertSolicitud(solicitud).subscribe(res => {
          Swal.fire(`Solicitud creada con exito, el numero de su solicitud es ${this.numeroSolicitud}`, '', 'success')
        }, err => {
          Swal.fire('No se pudo almacenar la solicitud', '', 'error')
        });
             console.log(solicitud)   
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      } else {
        console.log('cancelado')
      }
    })
  }

  generarCodigo() {
    const anio = moment().format('YYYY');
    const mes = moment().format('MM')
    const dia = moment().format('DD')
    this.cantidadSolicitudes += 1;
    var correlativo = this.cantidadSolicitudes.toString().padStart(7,'0');
    this.numeroSolicitud = anio + '-' + mes + '-' + dia + '-01-' + correlativo;
    console.log(this.numeroSolicitud);
  }

  regresarAMantenimientoSolicitudes() {
    this.router.navigate(['mantenimiento-solicitudes']);
  }
}
