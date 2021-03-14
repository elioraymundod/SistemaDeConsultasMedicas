import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogosService } from '../Services/catalogos.service';

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

  constructor(private _formBuilder: FormBuilder, 
              private servicios: CatalogosService) {
    this.crearMuestraFormGroup = this._formBuilder.group({
      tipoMuestraFormControl: ['', [Validators.required]],
      cantidadMuestraFormControl:['',[Validators.required]],
      cantidadFormControl: ['', [Validators.required, Validators.minLength(1)]],
      PresentacionFormControl: ['', [Validators.required, Validators.minLength(10)]]    
    });
  }

  ngOnInit(): void {
    this.servicios.getTipoMuestra().subscribe(res => {
      this.listaTipoMuestra=res; 
      console.log(this.listaTipoMuestra)
    })
  }

  

  cantidadUnidades: Opciones[] = [
    {value: '1', viewValue: 'Gramos '},
    {value: '2', viewValue: 'Miligramos'}
  ];

}
