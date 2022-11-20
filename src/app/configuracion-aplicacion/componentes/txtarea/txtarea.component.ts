import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-txtarea',
  templateUrl: './txtarea.component.html',
  styles: [''],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TxtareaComponent),
      multi: true,
    },
  ]
})
export class TxtareaComponent implements OnInit,ControlValueAccessor {
  
  @Input('textarea-label-value') textoEtiqueta!: string;       //Valor que se mostrara en la etiqueta
  @Input('textarea-label-columns') columnasEtiqueta!: number;  //Cantidad de columnas que ocupara el valor de la etiqueta
  @Input('textarea-model-columns') columnasModelo!: number;    //Cantidad de columnas que ocupara el textarea
  @Input('textarea-model-rows') filasModelo!: number;          //Cantidad de filas que ocupara el textarea
  @Input('textarea-max-length') longitudMaxima!: number;       //Cantidad maxima de caracteres que aceptara el textarea

  cantidadActual: number;           //Lleva el control de los caracteres ingresados en tiempo real y permite no pasar el maximo.
  esCampoObligatorio!:boolean;       //Variable para determinar si el campo es obligatorio
  textoEtiquetaObligatorio!:string;  //Variable con el nuevo valor de la etiqueta, sin asterisco
  valorComponente!:string;           //Variable para el valor del textarea
  
  constructor() {
    this.cantidadActual = 0;
  }

  ngOnInit(): void {
        
    //Verificando si el campo es obligatorio
    if( this.textoEtiqueta.indexOf('*') !== -1){
      this.textoEtiquetaObligatorio = this.textoEtiqueta.replace('*','');
      this.esCampoObligatorio = true; 
    }

  }

  onInput(target:any) {   
    this.valorComponente = target.value;
    this.cantidadActual=target.value.length;
    this.onTouch();
    this.onChange(this.valorComponente);
  }

  //Implementacion de metodos de la interface  
  onChange: any = () => {};
  onTouch:  any = () => {};

  writeValue(obj: string): void {        
    this.valorComponente = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }  

}
