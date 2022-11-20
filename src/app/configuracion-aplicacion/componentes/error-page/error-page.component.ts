import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styles: ['']
})
export class ErrorPageComponent implements OnInit {

  codigoEstado:string;        //Valor que se mostrará en el código de estado
  mensajeError:string;    //Descripción del error

  constructor() { 
    this.codigoEstado = "";
    this.mensajeError = "";
  }

  ngOnInit(): void {
    this.codigoEstado  = sessionStorage.getItem("codigoError") as string;
    this.mensajeError  = sessionStorage.getItem("mensajeError") as string;
  }

}
