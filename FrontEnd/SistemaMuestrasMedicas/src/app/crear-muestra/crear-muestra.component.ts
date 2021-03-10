import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private _formBuilder: FormBuilder) {
    this.crearMuestraFormGroup = this._formBuilder.group({
      tipoMuestraFormControl: ['', [Validators.required]],
      cantidadMuestraFormControl:['',[Validators.required]],
      cantidadFormControl: ['', [Validators.required, Validators.minLength(1)]],
      PresentacionFormControl: ['', [Validators.required, Validators.minLength(10)]]     
    });
  }

  ngOnInit(): void {
    
  }

  tipoMuestra : Opciones[] = [
    {value: '1', viewValue: 'Cultivo'},
    {value: '2', viewValue: 'Plaquetas'},
    {value: '3', viewValue: 'Eses'},
    {value: '4', viewValue: 'Orina'}
  ];

  cantidadUnidades: Opciones[] = [
    {value: '1', viewValue: 'Gramos '},
    {value: '2', viewValue: 'Miligramos'}
  ];

}
