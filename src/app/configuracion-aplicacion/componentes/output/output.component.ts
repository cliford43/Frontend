import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: []
})
export class OutputComponent implements OnInit {

  @Input('output-type')         tipo!:string;              //Tipo del output
  @Input('output-label-value')  textoEtiqueta!:string;     //Valor que se mostrara en la etiqueta
  @Input('output-model-value')  textoValor!:string;        //Nombre del formcontrol al que se hace referencia  
  @Input('output-label-columns') columnasEtiqueta!:string;   //Columnas que ocupara la etiqueta
  @Input('output-model-columns') columnasModelo!:string;     //Columnas que ocupara el texto
  
  campoObligatorio!:boolean;         //variable para determinar si el campo es obligatorio
  textoEtiquetaObligatorio!:string;  //Variable con el nuevo valor de la etiqueta, sin asterisco

  constructor() { }

  ngOnInit(): void { 

    //Verificando si el campo es obligatorio
    if( this.textoEtiqueta.indexOf('*') !== -1){
      this.textoEtiquetaObligatorio = this.textoEtiqueta.replace('*','');
      this.campoObligatorio = true; 
    }
        
  }


}
