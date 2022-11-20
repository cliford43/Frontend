import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DropdownPosition } from '@ng-select/ng-select';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styles: ['']
})
export class SelectComponent implements OnInit {  
  @Input('select-placeholder') textoPlaceholder?: string;   //Texto que mostrara el placeholder
  @Input('select-label-value') textoEtiqueta?: string; //Texto que se mostrará en la Etiqueta  
  @Input('select-list') listaValores!: any[] | null; //Lista con los valores
  @Input('select-model-value')
  atributoValor!: string; //Nombre del valor que tomara de cada elemento de la lista al ser seleccionado
 //Nombre del valor que tomara de cada elemento de la lista al ser seleccionado
  //Nombre del valor que tomara de cada elemento de la lista al ser seleccionado
  @Input('select-description-name')
  atributoDescripcion!: string; //Nombre del atributo de cada elemento de la lista que se mostrará como descripcion en el select  
 //Nombre del atributo de cada elemento de la lista que se mostrará como descripcion en el select  
  @Input('select-label-columns') columnasEtiqueta?: string; //Cantidad de columnas que ocupara la etiqueta  
  @Input('select-model-columns') columnasModelo?: string; //Cantidad de columnas que ocupara el select  
  @Input('select-readonly') soloLectura?: boolean; //Variable / valor  que indica si el select es de solo lectura
  @Input('select-placement')
  ubicacion!: DropdownPosition; // permite ubicar la lista desplegable arriba, abajo o automatico (top,button,auto).
 // permite ubicar la lista desplegable arriba, abajo o automatico (top,button,auto).
  // permite ubicar la lista desplegable arriba, abajo o automatico (top,button,auto).
  @Input('select-model-control')
  formularioControl!: string | number | null; //Nombre del Form Control al que se hace referencia en el select
 //Nombre del Form Control al que se hace referencia en el select
  @Input('select-model-group') formularioGrupo!: FormGroup; //formulario
  

  //propiedades de salida
  @Output() objectoSeleccionado = new EventEmitter<any>();

  esCampoObligatorio?:boolean;       //variable para determinar si el campo es obligatorio
  textoEtiquetaObligatorio?:string;  //Variable con el nuevo valor de la etiqueta, sin asterisco
  constructor() {}
  FunctionExecuteVoid(){}

  ngOnInit(): void {
    //Verificando si el campo es obligatorio
    if(this.textoEtiqueta && this.textoEtiqueta.indexOf('*') !== -1){
      this.textoEtiquetaObligatorio = this.textoEtiqueta.replace('*','');
      this.esCampoObligatorio = true; 
    }    
  }

  /**
   * Evento que debe dispararse al seleccionar un item
   * Devuelve todo el objeto item, por lo que se podra seleccionar
   * tanto codigo, nombre y despcripcion 
   * @param $event 
   */
  elementoSeleccionado($event:any){
    this.objectoSeleccionado.emit($event);
  }
  

}
