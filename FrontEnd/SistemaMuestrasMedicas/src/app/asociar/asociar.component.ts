import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private _formBuilder: FormBuilder) {{
this.AsociarFormGroup= this._formBuilder.group({



})


  } }

  ngOnInit(): void {
  }

  codigoMuestra: Opciones2[] = [
    {value: '1', viewValue: 'Gramos '},
    {value: '2', viewValue: 'Miligramos'}
  ];
}
