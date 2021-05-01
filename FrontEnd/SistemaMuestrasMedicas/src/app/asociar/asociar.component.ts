import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { MuestrasService } from '../Services/muestras.service';
import { SolicitudesService } from '../Services/solicitudes.service';

interface Opciones2{
  value : string;
  viewValue: string;
}

@Component({
  selector: 'app-asociar',
  templateUrl: './asociar.component.html',
  styleUrls: ['./asociar.component.scss']
})
export class AsociarComponent implements OnInit {
isLinear=false;
AsociarFormGroup:FormGroup;
InformacionMuestra:FormGroup;
Cod: any;
habilitarBtnSiguiente: boolean;
datosSolicitud: any;

  constructor(private _formBuilder: FormBuilder,
              private muestraService: MuestrasService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private solicitudesService: SolicitudesService) {
    this.AsociarFormGroup= this._formBuilder.group({
      codigoMuestraFormControl: ['', [Validators.required]],
    })

    this.InformacionMuestra= this._formBuilder.group({
      codigoMuestra1FormControl: ['', []],
      codigoTipoMuestraFormControl: ['', []],
      unidadMedicaFormControl: ['', []],
      presentacionFormControl: ['', []],
      cantidadUnidadFormControl: ['', []],
      fechaCreacionFormControl: ['', []],
      fechaVencimientoFormControl: ['', []],
      userCreacionFormControl: ['', []],
      adjuntoFormControl: ['', []],
      codigoSolicitudFormControl: ['', []],
      noExpedienteFormControl: ['', []],
      nitFormControl: ['', []],
      usuarioAsignacionFormControl: ['', []],
      usuarioCreacionFormControl: ['', []],
      estadoFormControl: ['', []],
      itemsFormControl: ['', []]
    })

    this.habilitarBtnSiguiente = false;
  } 

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(async res => {
      if(res.has('codigo_solicitud')) {
        let codigoSolicitud = res.get('codigo_solicitud');
        this.InformacionMuestra.get('codigoSolicitudFormControl')?.setValue(codigoSolicitud)
        this.solicitudesService.getSolicitudesByCodigo(codigoSolicitud).subscribe(res => {
          console.log('el res con los datos es', res)
          this.InformacionMuestra.get('noExpedienteFormControl')?.setValue(res[0].no_expediente)
          this.InformacionMuestra.get('nitFormControl')?.setValue(res[0].nit)
          this.InformacionMuestra.get('usuarioAsignacionFormControl')?.setValue(res[0].usuario)
          this.InformacionMuestra.get('usuarioCreacionFormControl')?.setValue(res[0].usuario_creacion)
          this.InformacionMuestra.get('estadoFormControl')?.setValue(res[0].estado)
          this.InformacionMuestra.get('itemsFormControl')?.setValue(res[0].dias_de_items)
        })

      }
    })
  }

   /**
   * Metodo para obtener codigo muestra en base a un numero de expediente
   */
    async getMuestra() {
       let noCodigoMuestra = this.AsociarFormGroup.get('codigoMuestraFormControl')?.value;
      console.log(noCodigoMuestra)
       await this.muestraService.getMuestraByCodigoMuestra(noCodigoMuestra).subscribe(res =>{
        this.Cod=res;
        console.log('el res es', res)
        if(res.length !== 0){
          
          console.log(res)
          this.habilitarBtnSiguiente = true;
          console.log(this.Cod[0].codigo_muestra)
          this.InformacionMuestra.get('codigoMuestra1FormControl')?.setValue(res[0].codigo_muestra),
          console.log(this.Cod[0].codigo_tipo_muestra),
          this.InformacionMuestra.get('codigoTipoMuestraFormControl')?.setValue(res[0].tipo_muestra),
          console.log(this.Cod[0].unidad_medica),
          this.InformacionMuestra.get('unidadMedicaFormControl')?.setValue(res[0].nombre_unidad),
          console.log(this.Cod[0].presentacion),
          this.InformacionMuestra.get('presentacionFormControl')?.setValue(res[0].presentacion),
          this.InformacionMuestra.get('cantidadUnidadFormControl')?.setValue(res[0].cantidadUnidades),
          this.InformacionMuestra.get('fechaCreacionFormControl')?.setValue(moment(res[0].fecha_creacion).format('DD-MM-YYYY')),
          this.InformacionMuestra.get('fechaVencimientoFormControl')?.setValue(moment(res[0].fecha_vencimiento).format('DD-MM-YYYY')),
          this.InformacionMuestra.get('userCreacionFormControl')?.setValue(res[0].usuario_creacion),
          this.InformacionMuestra.get('adjuntoFormControl')?.setValue(res[0].adjunto);
          Swal.fire({
            icon: 'success',
            title: 'Muestra encontrada, puede continuar'
                 })
        }
        else {
          this.habilitarBtnSiguiente = false;
          Swal.fire({
          icon: 'error',
          title: 'No se encontro ninguna Muestra con el codigo proporcionado'
               })

              }
         })
      
    }
    

  codigoMuestra: Opciones2[] = [
    {value: '1', viewValue: 'Gramos '},
    {value: '2', viewValue: 'Miligramos'}
  ];

  regresarAMantenimientoSolicitudes() {
    this.router.navigate(['mantenimiento-solicitudes']);
  }

}