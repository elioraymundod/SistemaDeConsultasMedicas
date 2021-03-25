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

  constructor(private _formBuilder: FormBuilder,
              private muestraService: MuestrasService) {{
this.AsociarFormGroup= this._formBuilder.group({
  codigoMuestraFormControl: ['', [Validators.required]],


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
        
        if(res.length !== 0){
          console.log(res)
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
