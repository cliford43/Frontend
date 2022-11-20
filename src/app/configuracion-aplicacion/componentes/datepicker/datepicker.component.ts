import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Utilidades } from '../../utilidades/utilidades';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ]  
})
export class DatepickerComponent implements OnInit, ControlValueAccessor {

  @Input('datepicker-label-value')      textoEtiqueta!:string;        //Valor que se mostrara en la etiqueta
  @Input('datepicker-placeholder')      textoPlaceholder!:string;     //Texto que tendra el placeholder 
  @Input('datepicker-label-columns')    columnasEtiqueta!:string;     //Columnas que ocupara la etiqueta
  @Input('datepicker-model-columns')    columnasModelo!:string;       //Columnas que ocupara el componente
  @Input('datepicker-min-date')         fechaMinima!:Date;            //Fecha máxima que se podrá seleccionar
  @Input('datepicker-max-date')         fechaMaxima!:Date;            //Fecha mínima que se podrá seleccionar

  fechaComponente!:string;           //Variable para mostrar la fecha seleccionada
  esCampoObligatorio!:boolean;       //Variable para determinar si el campo es obligatorio
  textoEtiquetaObligatorio!:string;  //Variable con el nuevo valor de la etiqueta, sin asterisco
  fechaMin: any;
  fechaMax: any;
  constructor() { }

  ngOnInit(): void {
    //Verificando si el campo es obligatorio
    if( this.textoEtiqueta.indexOf('*') !== -1){
      this.textoEtiquetaObligatorio = this.textoEtiqueta.replace('*','');
      this.esCampoObligatorio = true; 
    }
    if(this.fechaMaxima){
      this.fechaMax  = { year: this.fechaMaxima.getFullYear(), month: this.fechaMaxima.getMonth()+1, day: this.fechaMaxima.getDate() }
    }
    if(this.fechaMinima){
      this.fechaMin  = { year: this.fechaMinima.getFullYear(), month: this.fechaMinima.getMonth()+1, day: this.fechaMinima.getDate() }
    }
  }

  set valorComponte(obj:string) {    
    this.fechaComponente = Utilidades.formatoFecha(obj) as string;
    this.onChange(obj);
    this.onTouch(obj);
  }
  
  limpiar():void{
    this.valorComponte = '';
  }

  //Implementacion de metodos de la interface  
  onChange: any = () => {};
  onTouch:  any = () => {};

  writeValue(obj: string): void {    
    this.valorComponte = obj;
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
