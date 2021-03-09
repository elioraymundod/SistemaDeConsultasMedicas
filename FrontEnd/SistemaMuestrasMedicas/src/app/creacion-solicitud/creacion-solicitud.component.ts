import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CatalogosService } from '../Services/catalogos.service';

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
  tipoSolicitante: any;

  constructor(private _formBuilder: FormBuilder, 
              private catalogosService: CatalogosService,
              private activatedRoute: ActivatedRoute) {
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
    this.catalogosService.getTipoSolicitante().subscribe(res => {
      this.tipoSolicitante = res;
      console.log(this.tipoSolicitante)
    })
  }

  tipoSolicitud: Opciones[] = [
    {value: '1', viewValue: 'MM-Muestra medica'},
    {value: '2', viewValue: 'LQ-Laboratorio'}
  ];

}
