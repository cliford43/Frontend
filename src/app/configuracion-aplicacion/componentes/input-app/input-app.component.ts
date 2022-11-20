import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor,  NG_VALUE_ACCESSOR } from '@angular/forms';
import { Input } from '@angular/core';

@Component({
  selector: 'input-app',
  templateUrl: './input-app.component.html',
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputAppComponent),
      multi: true,
    },
  ]
})
export class InputAppComponent implements OnInit,ControlValueAccessor {
    
  @Input('input-label-value') textoEtiqueta?:string;        //Valor que se mostrara en la etiqueta
  @Input('input-placeholder') textoPlaceholder?:string;     //Texto que tendra el placeholder  
  @Input('input-help-link')     linkAyuda?:string;          //Link que redirigira a la pagina de ayuda
  @Input('input-help-text')     textoAyuda?:string;         //Texto que se mostrara como explicación bajo el input
  @Input('input-label-columns') columnasEtiqueta?:string;   //Columnas que ocupara la etiqueta
  @Input('input-model-columns') columnasModelo?:string;     //Columnas que ocupara el input
  @Input('input-max-length')    longitudMaxima:number;     //Numero maximo de caracteres en el input
  @Input('input-type')          tipo?:string;               //tipo de dato que acepta el input

  esCampoObligatorio?:boolean;       //Variable para determinar si el campo es obligatorio
  textoEtiquetaObligatorio?:string;  //Variable con el nuevo valor de la etiqueta, sin asterisco
  esTextoAyuda?:boolean;             //Variable para determinar si existe texto de ayuda 
  valorComponente?:string;           //Variable para el valor del input

  constructor() {
    this.longitudMaxima = 100;
    this.tipo = this.tipo? this.tipo : "text";
  }

  ngOnInit(): void {

    //Verificando si el campo es obligatorio
    if(this.textoEtiqueta && this.textoEtiqueta.indexOf('*') !== -1){
      this.textoEtiquetaObligatorio = this.textoEtiqueta.replace('*','');
      this.esCampoObligatorio = true; 
    }

    //Verificando si existe texto de ayuda
    if(this.textoAyuda){
      this.esTextoAyuda = true;
    }

  }

  onInput(target:any) {
    this.valorComponente = target.value;
    this.onTouch();
    this.onChange(this.valorComponente);
  }

  //Implementacion de metodos de la interface  
  onChange: any = () => {};
  onTouch:  any = () => {};

  writeValue(obj: any): void {
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
