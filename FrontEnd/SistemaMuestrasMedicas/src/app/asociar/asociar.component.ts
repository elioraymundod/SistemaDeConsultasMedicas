import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MuestrasService } from '../Services/muestras.service';

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

  constructor(private _formBuilder: FormBuilder,
              private muestraService: MuestrasService) {{
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
})

  } }

  ngOnInit(): void {
  }

   /**
   * Metodo para obtener codigo muestra en base a un numero de expediente
   */
    async getMuestra() {
       let noCodigoMuestra = this.AsociarFormGroup.get('codigoMuestraFormControl')?.value;
      console.log(noCodigoMuestra)
       await this.muestraService.getMuestraByCodigoMuestra(noCodigoMuestra).subscribe(res =>{
        this.Cod=res;
        if(res.length !== 0){
          console.log(res)
          console.log(this.Cod[0].codigo_muestra)
          this.InformacionMuestra.get('codigoMuestra1FormControl')?.setValue(res[0].codigo_muestra),
          console.log(this.Cod[0].codigo_tipo_muestra),
          this.InformacionMuestra.get('codigoTipoMuestraFormControl')?.setValue(res[0].codigo_tipo_muestra),
          console.log(this.Cod[0].unidad_medica),
          this.InformacionMuestra.get('unidadMedicaFormControl')?.setValue(res[0].unidad_medica),
          console.log(this.Cod[0].presentacion),
          this.InformacionMuestra.get('presentacionFormControl')?.setValue(res[0].presentacion),
          this.InformacionMuestra.get('cantidadUnidadFormControl')?.setValue(res[0].cantidadUnidades),
          this.InformacionMuestra.get('fechaCreacionFormControl')?.setValue(res[0].fecha_creacion),
          this.InformacionMuestra.get('fechaVencimientoFormControl')?.setValue(res[0].fecha_vencimiento),
          this.InformacionMuestra.get('userCreacionFormControl')?.setValue(res[0].usuario_creacion),
          this.InformacionMuestra.get('adjuntoFormControl')?.setValue(res[0].adjunto);
        }
        else {
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
}