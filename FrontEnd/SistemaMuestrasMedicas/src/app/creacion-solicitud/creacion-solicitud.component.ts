import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Opciones {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-creacion-solicitud',
  templateUrl: './creacion-solicitud.component.html',
  styleUrls: ['./creacion-solicitud.component.scss']
})
export class CreacionSolicitudComponent implements OnInit {

  isLinear = false;
  crearSolicitudFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.crearSolicitudFormGroup = this._formBuilder.group({
      tipoSolicitanteFormControl: ['', [Validators.required]],
      tipoSolicitudFormControl: ['', [Validators.required]],
      noExpedienteFormControl: ['', [Validators.required, Validators.minLength(21)]],
      descripcionFormControl: ['', [Validators.required, Validators.minLength(10)]],
      nitFormControl: ['', []],
      nombreFormControl: ['', []]
    });
   }

  ngOnInit(): void {
    
  }

  tipoSolicitante: Opciones[] = [
    {value: '1', viewValue: 'IN-Usuario interno'},
    {value: '2', viewValue: 'EX-Usuario externo'}
  ];

  tipoSolicitud: Opciones[] = [
    {value: '1', viewValue: 'MM-Muestra medica'},
    {value: '2', viewValue: 'LQ-Laboratorio'}
  ];

}
