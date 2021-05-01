import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { CatalogosService } from '../Services/catalogos.service';
import { MuestrasService } from '../Services/muestras.service';

interface Opciones{
  value : string;
  viewValue: string;
}
 
@Component({
  selector: 'app-crear-muestra',
  templateUrl: './crear-muestra.component.html',
  styleUrls: ['./crear-muestra.component.scss']
})
export class CrearMuestraComponent implements OnInit {

  isLinear=false;
  crearMuestraFormGroup: FormGroup;
  listaTipoMuestra: any;
  listaUnidadDeMedida: any;
  numeroMuestras: any;
  cantidadMuestras: any;
  date: Date;

  constructor(private _formBuilder: FormBuilder,
    private muestrasService: MuestrasService,// preguntar a Elio  
              private servicios: CatalogosService,
              private datePipe: DatePipe,
              private router: Router) {
    this.crearMuestraFormGroup = this._formBuilder.group({
      tipoMuestraFormControl: ['', [Validators.required]],
      cantidadMuestraFormControl:['',[Validators.required]],
      cantidadFormControl: ['', [Validators.required, Validators.minLength(1)]],
      PresentacionFormControl: ['', [Validators.required, Validators.minLength(10)]],
      //archivoMuestraFormControl:['',[Validators.required]],   
    });

      this.date = new Date();
  }

  async ngOnInit() {
    this.servicios.getTipoMuestra().subscribe(res => {
      this.listaTipoMuestra=res; 
    });

    this.servicios.getUnidadDeMedida().subscribe(res => {
      this.listaUnidadDeMedida = res;
      console.log(this.listaUnidadDeMedida)
    })

    // Obtener cantidad solicitudes
    await this.muestrasService.getAllMuesteras().subscribe(res => {
      this.cantidadMuestras = res.length;
      console.log('la cantidad de solicitudes es ', this.cantidadMuestras)
    });
  }
 

  guardarDatos() {
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
          const muestras = {
            codigo_muestra: this.numeroMuestras,
            codigo_tipo_muestra: this.crearMuestraFormGroup.get('tipoMuestraFormControl')?.value,
            unidad_medica: this.crearMuestraFormGroup.get('cantidadMuestraFormControl')?.value,
            presentacion: this.crearMuestraFormGroup.get('PresentacionFormControl')?.value,
            cantidadUnidades: Number(this.crearMuestraFormGroup.get('cantidadFormControl')?.value) ,
            adjunto: null,//pendiente ver como se mete 
            fecha_vencimiento: '2021-01-01',
            fecha_creacion: this.datePipe.transform(this.date, 'yyyy-MM-dd'),
            usuario_creacion: 'master' ,
            ip_usuario_creacion: '10.11.200.74',
            fecha_modificacion: null,
            usuario_modificacion: '',
            ip_usuario_modificacion:'',
           
          }
          console.log('prueba ',muestras)

       this.muestrasService.insertMuestras(muestras).subscribe(res => {
          Swal.fire(`Muestra creada con exito, el numero de su solicitud es ${this.numeroMuestras}`, '', 'success');
          this.crearMuestraFormGroup.reset();
        }, err => {
          Swal.fire('No se pudo almacenar la muestra', '', 'error')
        });
             console.log(muestras)   
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
    this.cantidadMuestras += 1;
    var correlativo = this.cantidadMuestras.toString().padStart(6,'0');
    this.numeroMuestras = anio + '-' + mes + '-' + dia + '-01-' + correlativo;
    console.log(this.numeroMuestras);
  }

  regresarAMantenimientoSolicitudes() {
    this.router.navigate(['mantenimiento-solicitudes']);
  }
  

}
