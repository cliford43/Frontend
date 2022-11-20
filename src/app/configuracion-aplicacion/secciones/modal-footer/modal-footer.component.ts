import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-footer',
  templateUrl: './modal-footer.component.html',
  styleUrls: []
})
export class ModalFooterComponent implements OnInit {

  @Input() avanzarPaso!: () => void;             //Funcion para avanzar paso, se ejecuta en el componente padre
  @Input() regresarPaso!:() => void;             //Funcion para avanzar paso, se ejecuta en el componente padre
  @Input() cerrarModal!: () => void;             //Funcion para cerrar el modal  
  @Input('cantidadPasos') cantidadPasos!:any; //Cantidad maxima de pasos del wizard  
  @Input('numeroPaso') numeroPaso!:any;       //Numero de paso en el que se encuentra el wizard

  constructor() { }

  ngOnInit(): void {}

  /**
  * @description
  * Función que muestra/oculta el botón siguiente.            
  */
  mostrarBotonSiguiente() {
    return this.numeroPaso >= this.cantidadPasos ? false : true; 
  }

}
